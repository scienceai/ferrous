
import React from 'react';

class Counter extends React.Component {
  constructor () {
    super();
    this.inc = () => {};
    this.dec = () => {};
  }
  render () {
    return (
      <div>
        <span>{ this.props.counter }</span>
        <button onClick={this.inc}>+</button>
        <button onClick={this.dec}>-</button>
      </div>
    );
  }
}

React.render(<Counter/>, document.getElementById('app'));
