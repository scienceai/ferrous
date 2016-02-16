
import React from 'react';

export default function hoc (Wrapped, store, state) {
  return class HOC extends React.Component {
    constructor () {
      super();
      this.handleUpdate = this.handleUpdate.bind(this);
    }
    handleUpdate (id, data) {
      this.dirty = true;
      this.forceUpdate();
      this.wrappedElement = <Wrapped {...data} $id={this.props.$id} $store={store}/>;
    }
    componentWillMount () {
      store.onID(this.props.$id, this.handleUpdate);
      this.dirty = true;
      let data = state(this.props.$id);
      this.wrappedElement = <Wrapped {...data} $id={this.props.$id} $store={store}/>;
    }
    componentWillUnmount () {
      store.removeIDListener(this.props.$id, this.handleUpdate);
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
