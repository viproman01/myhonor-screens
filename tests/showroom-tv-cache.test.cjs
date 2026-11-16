const test = require('node:test');
const assert = require('node:assert/strict');
const {createHash} = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const player = path.join(__dirname, '../showroom-player');
const read = file => fs.readFileSync(path.join(player, file), 'utf8');
const origin = 'https://myhonor.shop';

function worker({openCache, network}) {
  const events = {};
  const self = {location: new URL(origin + '/b/media-cache.js'),
    addEventListener: (name, callback) => { events[name] = callback; }};
  vm.runInNewContext(read('media-files.js'), {self});
  const context = {self, caches:{open:openCache}, fetch:network, navigator:{}, importScripts(){},
    URL, Response, Headers, TransformStream, ReadableStream, AbortController};
  vm.runInNewContext(read('media-cache.js'), context);
  return {files:self.HonorTvFiles, request(url, range) {
    let response, pending = [];
    const headers = range ? {Range:range} : {};
    events.fetch({clientId:'tv', request:new Request(url, {headers}), respondWith(x){response=x;},
      waitUntil(x){pending.push(x);}});
    return {response, finish:async () => Promise.all(pending)};
  }};
}

test('only a complete film is cached; playback, suffix seeks and invalid seeks reuse the on-disk copy', async () => {
  const items = new Map();
  const store = {
    keys:async () => [...items.keys()].map(url => new Request(url)),
    match:async key => items.get(key.url || key)?.clone(),
    put:async (url, response) => {
      items.set(url, new Response(await response.arrayBuffer(), {headers:response.headers}));
    }
  };
  const payload = Buffer.from('0123456789');
  let downloads = 0;
  const w = worker({openCache:async () => store, network:async () => {
    downloads++;
    return new Response(payload, {headers:{'Content-Length':'10','Content-Type':'video/mp4'}});
  }});
  const canonical = origin + Object.values(w.files)[0];
  const url = canonical + '?tv-cache=1';
  assert.equal(w.request(canonical).response,undefined,'rolled-back clients use native playback');
  const first = w.request(url,'bytes=0-');
  const cold = await first.response;
  assert.equal(cold.status,206);
  assert.equal(await cold.text(),payload.toString());
  await first.finish();
  for (const [range,text] of [[undefined,'0123456789'],['bytes=3-5','345'],['bytes=-2','89'],['bytes=6-','6789']]) {
    const warm = await w.request(url,range).response;
    assert.equal(warm.status,range ? 206 : 200);
    assert.equal(await warm.text(),text);
  }
  const invalid = await w.request(url,'bytes=10-').response;
  assert.equal(invalid.status,416);
  assert.equal(invalid.headers.get('Content-Range'),'bytes */10');
  assert.equal(downloads,1);
  assert.equal(w.request(origin+'/api/showroom/b/playlist').response,undefined);
  assert.equal(w.request(url+'?signed=1').response,undefined);
});

test('private browsing or disabled cache still permits native playback', async () => {
  const w = worker({openCache:async () => {throw Error('unavailable');}, network:async (url, options) => {
    assert.equal(new URL(url).search,'');
    assert.equal(options.headers.get('Range'),'bytes=12-');
    return new Response('tail',{status:206});
  }});
  const res = await w.request(origin+Object.keys(w.files)[0]+'?tv-cache=1','bytes=12-').response;
  assert.equal(await res.text(),'tail');
});

test('both script references follow content hashes; the worker scope is limited to the TV', () => {
  const html = read('tv.html');
  const sw = read('media-cache.js');
  const digest = s => createHash('sha256').update(s).digest('hex').slice(0,16);
  for (const s of [html,sw]) assert.ok(s.includes('/b/media-files.js?v='+digest(read('media-files.js'))));
  assert.ok(html.includes('/b/media-cache.js?v='+digest(sw)));
  assert.ok(html.includes("scope:'/b/'"));
  assert.ok(!read('panel.html').includes('media-cache.js'));
});

test('every shipped wide and mosaic has a unique immutable Full HD counterpart', () => {
  const w = worker({});
  const definitions = JSON.parse(read('tv.html').match(/var TV_MEDIA = (\{[\s\S]*?\n\});/)[1]);
  const originals = [...Object.values(definitions.wide), ...definitions.rounds.flat().map(item => item.url)].sort();
  assert.deepEqual(Object.keys(w.files).sort(),originals);
  assert.equal(new Set(Object.values(w.files)).size,originals.length);
  for (const file of Object.values(w.files)) assert.match(file,/^\/screens\/promo\/hd-[\w.-]+-[a-f\d]{12}\.mp4$/);
});
