import React, { Component } from 'react';
import axios from 'axios';

export default class SelectMany extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    
    this.state = {
      options: []
    }
  }

  getOptions() {
    if (this.props.customGet) {
      this.props.customGet(this.props.token)
        .then(res => {
          if (!this._isMounted) return;
          this.setState({
            options: res.data
          });
        }).catch(err => {
          alert(err);
        });
    } else {
      axios.get(this.props.getOptions.endpoint)
      .then(res => {
        if (!this._isMounted) return;
        this.setState({
          options: res.data.items.map(item => {
            return item[this.props.getOptions.property];
          })
        });
      });
    }
  }

  addOption(option) {
    let arr = this.props.value;
    if (!arr || arr.indexOf(option) !== -1) return;
    arr.push(option);
    this.props.setValue({ [this.props.name]: arr });
  }

  removeOption(index) {
    let arr = this.props.value;
    arr.splice(index, 1);
    this.props.setValue({ [this.props.name]: arr });
  }

  componentDidMount() {
    this._isMounted = true;
    if (!this.props.options && (this.props.getOptions || this.props.customGet)) {
      this.getOptions();
    }
    if (!this.props.value || !Array.isArray(this.props.value)) {
      this.props.setValue({ [this.props.name]: [] });
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }
  
  render () {
    const { label, name, value } = this.props;
    const options = this.state.options.length > 0 ? this.state.options : this.props.options;

    return (
      <div className="form-group">
        <label>{label || name}</label>
        <div className="array-input-items">
          {Array.isArray(value) ? value.map((elem, i) => {
            return (
              <div className="array-input-item" key={'array-input-item-' + elem + i}>
                {elem}
                <span className="array-input-item-remove" onClick={() => this.removeOption(i)}>x</span>
              </div>
            );
          }): ''}
        </div>
        <select
          className="form-control"
          name={name} 
          onChange={(e) => this.addOption(e.target.value)}>
          {options ? options.map(name => {
            return <option key={`option-${name}`} value={name}>{name}</option>
          }) : ''}
        </select>
      </div>
    );
  }
}