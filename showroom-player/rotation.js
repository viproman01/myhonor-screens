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

  root.HonorRotation = { deck: deck, newPortraits: newPortraits, watchPlayback: watchPlayback };
})(typeof window !== 'undefined' ? window : module.exports);
