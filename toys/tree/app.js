
import React from 'react';
import ReactDOM from 'react-dom';

import { tree, state, addChild, deleteItem } from './tree-model';
import hoc from '../hoc';

const Tree = ({ id, label, isRoot, children }) => {
  return (
    <div style={{ marginLeft: '50px' }}>
      <div>
        <strong>{ label }</strong>
        { !isRoot && <button onClick={() => deleteItem(id)}>x</button> }
        <button onClick={() => addChild('foo', id) }>+</button>
        <input ref={id}/>
      </div>
      <div>
        {
          children.map(id => <TreeBit $id={id} key={id}/>)
        }
      </div>
    </div>
  );
};
let TreeBit = hoc(Tree, tree, state);

ReactDOM.render(<TreeBit $id='$root'/>, document.getElementById('app'));
