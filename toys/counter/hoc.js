
import React from 'react';

export default function hoc (Wrapped, store) {
  return class HOC extends React.Component {
    constructor () {
      super();
      this.store = store;
      store.on('update', (id, data) => {
        this.dirty = true;
        this.setState(data);
        this.wrappedElement = <Wrapped {...data} $id={this.props.$id} $store={this.store}/>;
      });
    }
    componentWillMount () {
      this.dirty = true;
      let data = this.store.default(this.props.$id);
      this.setState(data);
      this.wrappedElement = <Wrapped {...data} $id={this.props.$id} $store={this.store}/>;
    }
    shouldComponentUpdate () {
      return this.dirty;
    }
    render () {
      this.dirty = false;
      return this.wrappedElement;
    }
  };
}
