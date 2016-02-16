
import StoreEmitter from '../store-emitter';
import shortid from 'shortid';

let content = {
  $root: {
    id:       '$root',
    children: [],
    isRoot:   true
  }
};

export let tree = new StoreEmitter();
export function state (id) {
  return content[id];
}
export function addChild (parentId) {
  let child = {
        id:       shortid.generate(),
        children: [],
        isRoot:   false,
      }
    , parent = content[parentId]
  ;
  if (!parent) throw new Error(`No such parent: ${parentId}`);
  content[child.id] = child;
  parent.children.push(child.id);
  tree.updateID(parentId, parent);
}
export function deleteItem (id) {
  let it = content[id];
  if (!it) throw new Error(`No such item: ${id}`);
  it.children.forEach(deleteItem);
  for (var k in content) {
    let idx = content[k].children.indexOf(id);
    if (~idx) {
      content[k].children.splice(idx, 1);
      tree.updateID(k, content[k]);
      break;
    }
  }
}
