
import React from 'react';
import ReactDOM from 'react-dom';

import { tree, state, addChild, deleteItem } from './tree-model';
import { ferrous, Provider } from '../..';

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
let TreeBit = ferrous(Tree, state);
ReactDOM.render(
  <Provider store={tree}>
    <TreeBit $id='$root'/>
  </Provider>,
  document.getElementById('app')
);
