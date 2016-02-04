
import React from 'react';
import ReactDOM from 'react-dom';

import CounterModel from './counter-model';
import hoc from '../hoc';

class Counter extends React.Component {
  componentWillMount () {
    let store = this.props.$store;
    this.inc = store.increment.bind(store);
    this.dec = store.decrement.bind(store);
  }
  render () {
    return (
      <div>
        <span>{ this.props.count }</span>
        <button onClick={this.inc}>+</button>
        <button onClick={this.dec}>-</button>
      </div>
    );
  }
}
let CNT = hoc(Counter, new CounterModel);

ReactDOM.render(<CNT $id='counter'/>, document.getElementById('app'));
