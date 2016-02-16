
import { EventEmitter } from 'events';

export default class StoreEmitter extends EventEmitter {
  onID (id, handler) {
    this.on(`$ferrous$${id}`, handler);
  }
  removeIDListener (id, handler) {
    this.removeListener(`$ferrous$${id}`, handler);
  }
  updateID (id, data) {
    this.emit(`$ferrous$${id}`, id, data);
  }
}
