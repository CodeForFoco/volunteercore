import React, { Component } from 'react';

export default class Select extends Component {
  render () {
    const { name, placeholder, value, label } = this.props;

    return (
      <>
        <label>{label || placeholder || name}</label>
        <div className="input-group">
          <select className="form-control" value={value} onChange={this.props.setValue.bind(this)}>
            {this.props.options.map((option, i) => {
              return <option key={name + option + i} value={option}>{option}</option>
            })}
          </select>
        </div>
      </>
    );
  }
}