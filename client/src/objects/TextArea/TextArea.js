import React, { Component } from 'react';

export default class TextArea extends Component {
  render () {
    const { label, name, required } = this.props;
    
    return (
      <div className="form-group">
        <label>{(required ? '* ' : '' ) + (label || name)}</label>
        <textarea
          className="form-control"
          name={name}
          value={this.props.val}
          onChange={(e) => { this.props.setValue({ [e.target.name]: e.target.value }); }}
          placeholder={this.props.placeholder || 'Enter ' + name}
        />
      </div>
    );
  }
}