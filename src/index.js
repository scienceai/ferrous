
import React from 'react';
import { EventEmitter } from 'events';
const { object, element } = React.PropTypes;

export function ferrous (Wrapped, state) {
  class Ferrous extends React.Component {
    constructor () {
      super();
      this.handleUpdate = this.handleUpdate.bind(this);
    }
    handleUpdate (id, data) {
      this.dirty = true;
      this.forceUpdate();
      this.wrappedElement = <Wrapped {...data} $id={this.props.$id}/>;
    }
    componentWillMount () {
      this.context.store.onID(this.props.$id, this.handleUpdate);
      this.dirty = true;
      let data = state(this.props.$id);
      this.wrappedElement = <Wrapped {...data} $id={this.props.$id}/>;
    }
    componentWillUnmount () {
      this.context.store.removeIDListener(this.props.$id, this.handleUpdate);
    }
    shouldComponentUpdate () {
      return this.dirty;
    }
    render () {
      this.dirty = false;
      return this.wrappedElement;
    }
  };
  Ferrous.displayName = `Ferrous(${Wrapped.displayName || Wrapped.name || 'Component'})`;
  Ferrous.contextTypes = {
    store: object.isRequired,
  };
  return Ferrous;
}

export class StoreEmitter extends EventEmitter {
  onID (id, handler) {
    this.on(`$ferrous$${id}`, handler);
  }
  removeIDListener (id, handler) {
    this.removeListener(`$ferrous$${id}`, handler);
  }
  updateID (id, data) {
    this.emit(`$ferrous$${id}`, id, data);
  }
}

// thank you redux
export class Provider extends React.Component {
  constructor (props, context) {
    super(props, context);
    this.store = props.store;
  }
  getChildContext () {
    return { store: this.store };
  }
  render () {
    return React.Children.only(this.props.children);
  }
}
Provider.propTypes = {
  store:    object.isRequired,
  children: element.isRequired,
};
Provider.childContextTypes = {
  store:    object.isRequired,
};
