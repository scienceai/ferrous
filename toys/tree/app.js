
import React from 'react';
import ReactDOM from 'react-dom';

import TreeModel from './tree-model';
import hoc from '../hoc';

class Tree extends React.Component {
  componentWillMount () {
    // console.log('cwm');
    let { $store, $id } = this.props;
    this.del = () => $store.deleteItem($id);
    this.add = () => $store.addChild('foo', $id); // XXX get the label
  }
  render () {
    // console.log(JSON.stringify(this.props, null, 2));
    // console.log(`render ${this.props.$id} -> ${this.props.children.join(', ')}`);
    return (
      <div style={{ marginLeft: '50px' }}>
        <div>
          <strong>{ this.props.label }</strong>
          { !this.props.isRoot && <button onClick={this.del}>x</button> }
          <button onClick={this.add}>+</button>
        </div>
        <div>
          {
            this.props.children.map(id => <TreeBit $id={id}/>)
          }
        </div>
      </div>
    );
  }
}
let TreeBit = hoc(Tree, new TreeModel);

ReactDOM.render(<TreeBit $id='$root'/>, document.getElementById('app'));
