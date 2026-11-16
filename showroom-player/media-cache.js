// This worker controls only /b/. Cache complete immutable TV films on first playback.
'use strict';
importScripts('/b/media-files.js?v=a911b01a76814304');
const cacheName = 'honor-showroom-b-films-v1';
const files = new Set(Object.keys(self.HonorTvFiles).concat(Object.values(self.HonorTvFiles)));
const budget = 224 * 1024 * 1024;
const perFileLimit = 48 * 1024 * 1024;
const active = new Map();

self.addEventListener('install', event => event.waitUntil(self.skipWaiting()));
self.addEventListener('activate', event => event.waitUntil((async () => {
  await self.clients.claim();
  try {
    const store = await caches.open(cacheName);
    for (const key of await store.keys()) {
      if (!files.has(new URL(key.url).pathname)) await store.delete(key);
    }
  } catch (_) { /* Storage may be disabled on this TV. */ }
})()));

function byteRange(header, length) {
  if (!header) return [0, length - 1];
  const match = /^bytes=(\d*)-(\d*)$/i.exec(header);
  if (!match || (!match[1] && !match[2])) return null;
  const start = match[1] ? Number(match[1]) : Math.max(0, length - Number(match[2]));
  const end = match[1] && match[2] ? Math.min(Number(match[2]), length - 1) : length - 1;
  if (!Number.isSafeInteger(start) || !Number.isSafeInteger(end) || start > end || start >= length) return null;
  return [start, end];
}

function partialHeaders(headers, start, end, total) {
  const output = new Headers(headers);
  output.delete('content-encoding');
  output.set('Accept-Ranges', 'bytes');
  output.set('Content-Range', 'bytes ' + start + '-' + end + '/' + total);
  output.set('Content-Length', String(end - start + 1));
  return output;
}

async function fromDisk(hit, range) {
  if (!range) return hit;
  const total = Number(hit.headers.get('Content-Length'));
  const pair = byteRange(range, total);
  if (!pair) return new Response(null, {status: 416, headers: {'Content-Range': 'bytes */' + total}});
  const [start, end] = pair;
  const headers = partialHeaders(hit.headers, start, end, total);
  if (start === 0 && end === total - 1) return new Response(hit.body, {status: 206, headers});
  const blob = await hit.blob();
  return new Response(blob.slice(start, end + 1), {status: 206, headers});
}

async function makeRoom(store, size) {
  let remaining = budget;
  if (navigator.storage && navigator.storage.estimate) {
    const estimate = await navigator.storage.estimate().catch(() => ({}));
    if (estimate.quota > 0) remaining = Math.min(remaining, estimate.quota - estimate.usage - 8 * 1024 * 1024);
  }
  const entries = [];
  let usage = 0;
  for (const key of await store.keys()) {
    const cached = await store.match(key);
    if (!cached) continue;
    const length = Number(cached.headers.get('Content-Length')) || 0;
    usage += length;
    entries.push({key, length});
  }
  remaining = Math.min(remaining, budget - usage);
  for (const entry of entries) {
    if (remaining >= size) break;
    if (await store.delete(entry.key)) remaining += entry.length;
  }
  return remaining >= size;
}

async function film(event) {
  const request = event.request;
  const range = request.headers.get('Range');
  const source = new URL(request.url);
  source.search = '';
  const canonical = source.href;
  // The marker belongs to the player, never to the CDN cache key.
  const native = () => fetch(canonical, {headers:request.headers, credentials:'omit', signal:request.signal});
  const previous = active.get(event.clientId);
  if (previous && previous.url !== request.url) previous.cancel();
  let store;
  try {
    store = await caches.open(cacheName);
    const hit = await store.match(canonical);
    if (hit) return await fromDisk(hit, range);
  } catch (_) { return native(); }
  // Preserve native seeking on a cold file. Its normal open-ended play request
  // can be served immediately while the very same response is written to disk.
  if ((range && range !== 'bytes=0-') || (previous && previous.url === request.url)) return native();
  const aborter = new AbortController();
  const writing = {url: request.url, cancel: () => aborter.abort()};
  active.set(event.clientId, writing);
  function forget() { if (active.get(event.clientId) === writing) active.delete(event.clientId); }
  let response;
  try {
    response = await fetch(canonical, {signal: aborter.signal, credentials: 'omit'});
  } catch (error) { forget(); throw error; }
  const size = Number(response.headers.get('Content-Length'));
  if (response.status !== 200 || !response.body || !Number.isSafeInteger(size) || size <= 0 || size > perFileLimit ||
      (response.headers.has('Content-Encoding') && response.headers.get('Content-Encoding') !== 'identity') ||
      !/^video\/mp4/i.test(response.headers.get('Content-Type') || '')) {
    forget();
    return response;
  }
  if (!await makeRoom(store, size).catch(() => false)) { forget(); return response; }
  const headers = response.headers;
  const reader = response.body.getReader();
  const disk = new TransformStream();
  const writer = disk.writable.getWriter();
  let save = true;
  let received = 0;
  const stopDisk = () => { save = false; return writer.abort().catch(() => {}); };
  // Backpressure couples playback and disk writes. The worker never queues an
  // entire movie in JS memory, even if the network is faster than the decoder.
  const saved = (async () => {
    try {
      await store.put(canonical, new Response(disk.readable, {headers}));
    } catch (_) { await stopDisk(); }
  })();
  event.waitUntil(saved);
  const body = new ReadableStream({
    async pull(controller) {
      try {
        const frame = await reader.read();
        if (frame.done) {
          if (received !== size) throw new Error('Incomplete TV media response');
          if (save) await writer.close().catch(() => {});
          controller.close();
          forget();
          return;
        }
        received += frame.value.byteLength;
        if (save) await writer.write(frame.value).catch(() => {});
        controller.enqueue(frame.value);
      } catch (error) {
        await stopDisk();
        forget();
        controller.error(error);
      }
    },
    async cancel() {
      aborter.abort();
      forget();
      await Promise.all([reader.cancel().catch(() => {}), stopDisk()]);
    }
  });
  return range ? new Response(body, {status:206, headers:partialHeaders(headers, 0, size - 1, size)})
    : new Response(body, {headers});
}

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  if (event.request.method === 'GET' && url.origin === self.location.origin &&
      url.search === '?tv-cache=1' && files.has(url.pathname)) event.respondWith(film(event));
});
