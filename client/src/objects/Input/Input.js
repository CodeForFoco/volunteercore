import React, { Component } from 'react';
import './Input.scss';

export default class Input extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modified: false,
      valid: false,
      options: []
    };
  }

  updateValid() {
    const valid = this.props.test ? this.props.test() : this.props.value ? true : false;
    this.setState({ valid, modified: true });
  }

  componentDidMount() {
    if (this.props.getOptions) {
      this.props.getOptions((err, res) => {
        console.log(err);
        if (err !== undefined) { return alert('Error loading partners. Please reload page.'); }
        this.setState({ options: res.data.items });
      });
    }
  }

  render () {
    const { valid, modified } = this.state;
    const options = this.state.options && this.state.options.length > 0 ? this.state.options : this.props.options;

    return (
      <div className={`form-group ${modified ? valid ? 'has-success' : 'has-danger' : ''}`}>
        <label className="control-label">{(this.props.optional ? '' : '* ') + (this.props.label || this.props.name) + (this.props.ex ? ` (${this.props.ex})` : '')}</label>
        { this.props.type === 'textarea' ?
          <textarea
            autoComplete={this.props.autoComplete || 'null'}
            className={`form-control ${modified ? valid ? 'is-valid' : 'is-invalid' : ''}`}
            name={this.props.name}
            placeholder={this.props.placeholder || 'Enter ' + (this.props.label || this.props.name)} 
            value={this.props.value}
            onChange={this.props.set.bind(this)}
            onBlur={this.updateValid.bind(this)}
            disabled={this.props.disabled}
            required={this.props.required}
          />: this.props.type === 'select' ? (
            <select 
              className="form-control"
              autoComplete={this.props.autoComplete || 'null'}
              className={`form-control ${modified ? valid ? 'is-valid' : 'is-invalid' : ''}`}
              name={this.props.name}
              placeholder={this.props.placeholder || 'Enter ' + (this.props.label || this.props.name)} 
              value={this.props.value}
              onChange={this.props.set.bind(this)}
              onBlur={this.updateValid.bind(this)}
              disabled={this.props.disabled}
              required={this.props.required}
            >
              {options && options.length > 0 ? options.map(option => {
                return <option key={option.name || option} value={option.name || option}>{option.name || option}</option>
              }): ''}
            </select>
          ):(
          <input 
            autoComplete={this.props.autoComplete || 'null'}
            className={`form-control ${modified ? valid ? 'is-valid' : 'is-invalid' : ''}`}
            type={this.props.type || 'text'}
            name={this.props.name}
            placeholder={this.props.placeholder || 'Enter ' + (this.props.label || this.props.name)} 
            value={this.props.value}
            onChange={this.props.set.bind(this)}
            onBlur={this.updateValid.bind(this)}
            disabled={this.props.disabled}
            required={this.props.required}
          />
        )}
      </div>
    );
  }
}