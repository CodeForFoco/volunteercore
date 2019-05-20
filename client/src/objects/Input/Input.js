import React, { Component } from 'react';

export default class Input extends Component {
  render () {
    const { name, placeholder, value, label, type } = this.props;

    return (
      <>
        <label>{label || placeholder || name}</label>
        <div className="form-group">
          <input
            className="form-control"
            name={name}
            onChange={this.props.setValue.bind(this)}
            placeholder={this.props.placeholder || this.props.name}
            type={type || 'text'}
            value={value}
          />
        </div>
      </>
    );
  }
}