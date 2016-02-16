
import React from 'react';
import ReactDOM from 'react-dom';

import { tree, state, addChild, deleteItem } from './tree-model';
import { ferrous } from '../..';

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
let TreeBit = ferrous(Tree, tree, state);

ReactDOM.render(<TreeBit $id='$root'/>, document.getElementById('app'));
