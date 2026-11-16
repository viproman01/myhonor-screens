const test = require('node:test');
const assert = require('node:assert/strict');
const { deck, newPortraits } = require('../showroom-player/rotation.js').HonorRotation;

test('every single-screen round plays each distinct file once, with no adjacent repeat', () => {
  assert.equal(new Set(newPortraits).size, 6);
  const draw = deck(newPortraits);
  let previous;
  for (let round = 0; round < 250; round++) {
    const order = [];
    for (let turn = 0; turn < newPortraits.length; turn++) {
      const next = draw();
      assert.notEqual(next, previous);
      order.push(next);
      previous = next;
    }
    assert.deepEqual(order.slice().sort(), newPortraits.slice().sort());
  }
});

test('asynchronous column changes exclude the other two clips and the previous clip', () => {
  const draw = deck(newPortraits);
  const active = [];
  for (let i = 0; i < 3; i++) active.push(draw(active));
  const seen = new Set(active);
  for (let turn = 0; turn < 2000; turn++) {
    // One column stalls for a while; draws in the others must still progress.
    const col = turn % 17 === 0 ? 2 : turn % 2;
    const next = draw(active);
    assert.ok(newPortraits.includes(next));
    assert.ok(!active.includes(next));
    active[col] = next;
    seen.add(next);
    assert.equal(new Set(active).size, 3);
  }
  assert.equal(seen.size, newPortraits.length);
});

test('managed programs require safe media and preserve the number of distinct TV windows', () => {
  const {normalize} = require('../showroom-player/rotation.js').HonorRotation;
  global.location = {origin: 'https://myhonor.shop'};
  try {
    const input = {schema:1, code:'b', blackout:false, version:'v1', photoSeconds:8,
      wideVideos:['/media/wide.mp4'], videos:[], photos:[]};
    assert.deepEqual(normalize(input,'b').wideVideos,['https://myhonor.shop/media/wide.mp4']);
    assert.equal(normalize(input,'c'),null);
    assert.equal(normalize({...input, videos:['/media/a','/media/b','/media/b']},'b'),null);
    assert.equal(normalize({...input, wideVideos:['javascript:void(0)']},'b'),null);
    assert.equal(normalize({...input, wideVideos:['/admin/secret']},'b'),null);
    assert.equal(normalize({...input, wideVideos:['https://user:pwd@example.org/']},'b'),null);
    assert.equal(normalize({...input, code:'c', videos:[], photos:['/media/img.jpg']},'c').photos.length,1);
  } finally { delete global.location; }
});

test('each single-stream TV round includes all twelve portraits in disjoint three-column packs', () => {
  const fs = require('node:fs');
  const path = require('node:path');
  const tv = fs.readFileSync(path.join(__dirname, '../showroom-player/tv.html'),'utf8');
  const manifest = JSON.parse(tv.match(/var TV_MEDIA = (\{[\s\S]*?\n\});/)[1]);
  const ids = Object.keys(manifest.vertical).sort();
  assert.equal(ids.length, 12);
  assert.equal(Object.keys(manifest.wide).length, 4);
  assert.equal(manifest.rounds.length, 3);
  for (const round of manifest.rounds) {
    assert.deepEqual(round.flatMap(pack => pack.lanes.flat()).sort(),ids);
    for (const pack of round) {
      assert.equal(pack.lanes.length,3);
      assert.match(pack.url,/^\/screens\/promo\/tv-mosaic-.*\.mp4$/);
      assert.ok(pack.lanes.every(lane => lane.length === 2));
      assert.equal(new Set(pack.lanes.flat()).size,6);
    }
  }
});
