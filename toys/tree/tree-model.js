
import { EventEmitter } from 'events';
import shortid from 'shortid';

export default class TreeModel extends EventEmitter {
  constructor () {
    super();
    this.tree = {
      $root: {
        label:    'Root',
        id:       '$root',
        children: [],
        isRoot:   true
      }
    };
  }
  // get() is always synchronous. If you don't want it to be, use it to specify a default while
  // waiting. => look into async props
  get (id) {
    return this.tree[id];
  }
  addChild (label, parentId) {
    console.log(`addChild ${label} ${parentId}`);
    let child = {
          id:       shortid.generate(),
          children: [],
          label,
        }
      , parent = this.tree[parentId]
    ;
    if (!parent) throw new Error(`No such parent: ${parentId}`);
    this.tree[child.id] = child;
    parent.children.push(child.id);
    this.emit('update', parentId, parent);
  }
  deleteItem (id) {
    let it = this.tree[id];
    if (!it) throw new Error(`No such item: ${id}`);
    item.children.forEach(kid => this.deleteItem(kid));
    for (var k in this.tree) {
      let idx = this.tree[k].children.indexOf(id);
      if (~idx) {
        this.tree[k].children.splice(idx, 1);
        this.emit('update', k, this.tree[k]);
        break;
      }
    }
    // XXX we could emit delete but... we don't need to
  }
}
