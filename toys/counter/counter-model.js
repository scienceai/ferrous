
import { EventEmitter } from 'events';

export default class CounterModel extends EventEmitter {
  constructor () {
    this.emit('update', 'counter', 0);
    this.counter = 0;
  }
  get () {
    return this.counter;
  }
  increment () {
    this.counter++;
    this.emit('update', 'counter', this.counter);
  }
  increment () {
    this.counter--;
    this.emit('update', 'counter', this.counter);
  }
}
