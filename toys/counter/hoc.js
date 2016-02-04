
import React from 'react';

export default function hoc (Wrapped, store) {
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
      store.on('update', this.handleUpdate);
      this.dirty = true;
      let data = store.default(this.props.$id);
      this.wrappedElement = <Wrapped {...data} $id={this.props.$id} $store={store}/>;
    }
    componentWillUnmount () {
      store.removeListener('update', this.handleUpdate);
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
