// Shared by the showroom TV and the two portrait panels. Compatible with Chrome 88.
(function (root) {
  'use strict';

  var newPortraits = [
    'nov16-img-5220-a6c06b6e97.mp4',
    'nov16-img-5222-7c4b0d0249.mp4',
    'nov16-img-5228-cf30cc2be2.mp4',
    'nov16-img-5399-9752e06646.mp4',
    'nov16-img-5432-53f500d674.mp4',
    'nov16-img-5434-21ad1ee1cf.mp4'
  ].map(function (file) { return '/screens/promo/' + file; });

  function shuffled(items) {
    var copy = items.slice();
    for (var i = copy.length - 1; i > 0; i--) {
      var pick = Math.floor(Math.random() * (i + 1));
      var value = copy[i];
      copy[i] = copy[pick];
      copy[pick] = value;
    }
    return copy;
  }

  // Keep the remaining clips across draws. A long-running clip on another
  // column can temporarily reserve the last item; keep it for the next draw.
  function deck(items) {
    var remaining = [];
    var last = null;
    return function draw(unavailable) {
      if (!remaining.length) remaining = shuffled(items);
      var blocked = unavailable || [];
      function available(item) { return blocked.indexOf(item) === -1; }
      var index = remaining.findIndex(function (item) { return item !== last && available(item); });
      if (index < 0) index = remaining.findIndex(available);
      if (index >= 0) last = remaining.splice(index, 1)[0];
      else {
        var eligible = items.filter(available);
        if (!eligible.length) return null;
        last = eligible[Math.floor(Math.random() * eligible.length)];
      }
      return last;
    };
  }

  // Some TV decoders freeze on an already buffered frame without firing error.
  function watchPlayback(video, isCurrent, advance) {
    var lastTime = video.currentTime;
    var id = setInterval(function () {
      if (!isCurrent()) { clearInterval(id); return; }
      if (video.currentTime === lastTime) {
        clearInterval(id);
        advance();
      } else lastTime = video.currentTime;
    }, 15000);
  }

  function stringList(items) {
    if (!Array.isArray(items) || items.length > 40) return null;
    var unique = [];
    for (var i = 0; i < items.length; i++) {
      var value = items[i];
      if (typeof value !== 'string' || !value || value.length > 4096) return null;
      if (!/^https:\/\//i.test(value) && !/^\/(?:screens\/promo|media)\//.test(value)) return null;
      var parsed;
      try { parsed = new URL(value, location.origin); } catch (e) { return null; }
      if (parsed.protocol !== 'https:' || parsed.username || parsed.password) return null;
      if (value.charAt(0) === '/' && !/^\/(?:screens\/promo|media)\//.test(parsed.pathname)) return null;
      if (unique.indexOf(parsed.href) === -1) unique.push(parsed.href);
    }
    return unique;
  }

  function normalize(raw, code) {
    if (!raw || raw.schema !== 1 || raw.code !== code || typeof raw.blackout !== 'boolean') return null;
    var wideVideos = stringList(raw.wideVideos);
    var videos = stringList(raw.videos);
    var photos = stringList(raw.photos);
    if (!wideVideos || !videos || !photos) return null;
    if (code === 'b' && ((videos.length > 0 && videos.length < 3) || (!wideVideos.length && !videos.length))) return null;
    if (code !== 'b' && !videos.length && !photos.length) return null;
    if (!Number.isFinite(raw.photoSeconds) || raw.photoSeconds <= 0) return null;
    return { wideVideos: wideVideos, videos: videos, photos: photos,
      blackout: raw.blackout, photoSeconds: raw.photoSeconds };
  }

  // Start even if the shop is unreachable. Cache only a validated media list for this tab.
  // Matching payloads keep the currently playing frame (an unrelated admin edit can change version).
  function manage(code, configure, start, defaults) {
    var cacheKey = 'honor-showroom-media-v1-' + code;
    var signature = '', started = false, pending = false;
    function accept(raw) {
      var media = normalize(raw, code);
      if (!media) return;
      var next = JSON.stringify(media);
      if (next === signature) return;
      signature = next;
      try { sessionStorage.setItem(cacheKey, JSON.stringify(raw)); } catch (e) {}
      configure(media);
      if (started) start();
    }
    function begin() {
      if (started) return;
      started = true;
      start();
    }
    try { accept(JSON.parse(sessionStorage.getItem(cacheKey))); } catch (e) {}
    function poll() {
      if (pending) return;
      pending = true;
      var controller = new AbortController();
      var timeout = setTimeout(function(){ controller.abort(); }, 5000);
      fetch('/api/showroom/' + code + '/playlist', {
        signal: controller.signal, credentials: 'omit', cache: 'no-store'
      }).then(function(response) {
        if (response.status === 404) {
          if (signature) {
            signature = '';
            try { sessionStorage.removeItem(cacheKey); } catch (e) {}
            configure(defaults);
            if (started) start();
          }
          return null;
        }
        if (!response.ok) throw new Error('Playlist unavailable');
        return response.json();
      }).then(accept).catch(function() {}).finally(function() {
        clearTimeout(timeout);
        pending = false;
        begin();
      });
    }
    poll();
    setTimeout(begin, 2000);
    setInterval(poll, 30000);
  }

  root.HonorRotation = { deck: deck, newPortraits: newPortraits, watchPlayback: watchPlayback,
    normalize: normalize, manage: manage };
})(typeof window !== 'undefined' ? window : module.exports);
