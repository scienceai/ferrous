
import { EventEmitter } from 'events';

export default class CounterModel extends EventEmitter {
  default () {
    if (typeof this.counter === 'undefined') this.counter = 0;
    return { count: this.counter };
  }
  increment () { this.counter++; this._up(); }
  decrement () { this.counter--; this._up(); }
  _up () { this.emit('update', 'counter', { count: this.counter }); }
}
