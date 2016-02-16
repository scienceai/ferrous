
import React from 'react';
import ReactDOM from 'react-dom';

import { counter, state, increment, decrement } from './counter-model';
import { ferrous } from '../..';

const Counter = ({ count }) => {
  return (
    <div>
      <span>{ count }</span>
      <button onClick={ increment }>+</button>
      <button onClick={ decrement }>-</button>
    </div>
  );
};
let CNT = ferrous(Counter, counter, state);

ReactDOM.render(<CNT $id='counter'/>, document.getElementById('app'));
