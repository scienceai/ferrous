
import { StoreEmitter } from '../..';

let count = 0;

export let counter = new StoreEmitter();
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
  counter.updateID('counter', { count });
}
