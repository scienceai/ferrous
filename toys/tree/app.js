
import React from 'react';
import ReactDOM from 'react-dom';

import { tree, state, addChild, deleteItem } from './tree-model';
import hoc from '../hoc';

const Tree = ({ id, isRoot, children }) => {
  return (
    <div style={{ marginLeft: '50px' }}>
      <div>
        <strong>{ id }</strong>
        { !isRoot && <button onClick={() => deleteItem(id)}>x</button> }
        <button onClick={() => addChild(id) }>+</button>
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
