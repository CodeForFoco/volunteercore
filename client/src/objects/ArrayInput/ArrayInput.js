import React, { Component } from 'react';
import './ArrayInput.scss';

export default class ArrayInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: ''
    }
  }

  addElement() {
    let arr = this.props.value;
    arr.push(this.state.text);
    this.setState({ text: '' });
    this.props.setValue({ [this.props.name]: arr });
  }

  removeElement(index) {
    let arr = this.props.value;
    arr.splice(index, 1);
    this.props.setValue({ [this.props.name]: arr });
  }

  updateText(e) {
    this.setState({ text: e.target.value });
  }

  componentDidMount() {
    if (!Array.isArray(this.props.value)) {
      this.props.setValue({ [this.props.name]: [] });
    }
  }

  render () {
    const { name, label, value, placeholder } = this.props;

    return (
      <div className="form-group">
        <label>{ label || name }</label>
        <div className="array-input-items">
          {Array.isArray(value) ? value.map((elem, i) => {
            return (
              <div className="array-input-item" key={'array-input-item-' + elem + i}>
                {elem}
                <span className="array-input-item-remove" onClick={() => this.removeElement(i)}>x</span>
              </div>
            );
          }): ''}
        </div>
        <div className="input-group">
          <input 
            autoComplete={this.props.autoComplete || 'null'}
            className="form-control"
            placeholder={placeholder || 'Enter ' + (this.props.label || this.props.name)} 
            value={this.state.text}
            onChange={this.updateText.bind(this)}
          />
          <div className="input-group-append">
            <div className="btn btn-info" onClick={this.addElement.bind(this)}>Add</div>
          </div>
        </div>
      </div>
    );
  }
}