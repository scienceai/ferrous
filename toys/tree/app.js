
import React from 'react';
import ReactDOM from 'react-dom';

import { tree, state, addChild, deleteItem } from './tree-model';
import { ferrous, Provider } from '../..';

const Tree = ({ id, isRoot, children, plusColor }) => {
  console.log(plusColor);
  return (
    <div style={{ marginLeft: '50px' }}>
      <div>
        <strong>{ id }</strong>
        { !isRoot && <button onClick={() => deleteItem(id)} style={{ color: 'red' }}>x</button> }
        <button onClick={() => addChild(id) } style={{ color: plusColor }}>+</button>
      </div>
      <div>
        {
          children.map(id => <TreeBit $id={id} key={id} plusColor={plusColor}/>)
        }
      </div>
    </div>
  );
};
let TreeBit = ferrous(Tree, state);
ReactDOM.render(
  <Provider store={tree}>
    <TreeBit $id='$root' plusColor='green'/>
  </Provider>,
  document.getElementById('app')
);
