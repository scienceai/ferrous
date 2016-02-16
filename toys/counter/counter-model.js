
import { EventEmitter } from 'events';

let count = 0;

// XXX
// maybe we want to merge store and state, it would make some sense
// but the rest should remain nicely as functions
export let counter = new EventEmitter();
export function state (id) {
  if (id === 'counter') return { count };
}
export function increment () {
  count++;
  signal();
}
export function decrement () {
  count--;
  signal();
}

function signal () {
  counter.emit('update', 'counter', { count });
}
