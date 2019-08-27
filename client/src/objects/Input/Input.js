import React, { Component } from 'react';
import './Input.scss';

export default class Input extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modified: false,
      valid: false
    };
  }

  updateValid() {
    const valid = this.props.test ? this.props.test() : this.props.value ? true : false;
    this.setState({ valid, modified: true });
  }

  render () {
    const { valid, modified } = this.state;

    return (
      <div className={`form-group ${modified ? valid ? 'has-success' : 'has-danger' : ''}`}>
        <label className="control-label">{(this.props.required ? '* ' : '') + (this.props.label || this.props.name) + (this.props.ex ? ` (${this.props.ex})` : '')}</label>
        <input 
          autoComplete={this.props.autoComplete || 'null'}
          className={`form-control ${modified ? valid ? 'is-valid' : 'is-invalid' : ''}`}
          type={this.props.type || 'text'}
          name={this.props.name}
          placeholder={this.props.placeholder || 'Enter ' + (this.props.label || this.props.name)} 
          value={this.props.value || ''}
          onChange={(e) => { this.props.setValue({ [e.target.name]: e.target.value}) }}
          onBlur={this.updateValid.bind(this)}
          disabled={this.props.disabled}
          required={this.props.required}
        />
      </div>
    );
  }
}