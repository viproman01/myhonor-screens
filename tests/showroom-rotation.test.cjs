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
