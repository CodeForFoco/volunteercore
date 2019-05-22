import React, { Component } from 'react';
import axios from 'axios';
import Input from '../../objects/Input/Input';
import Select from '../../objects/Select/Select';
import './DashForm.scss';

export default class DashForm extends Component {
  getOptions(name, endpoint) {
    let data = this.props.data;
    if (data[name].options && data[name].options.length > 0) {
      return;
    }
    axios.get(endpoint, { headers: {
      Authorization: 'Bearer ' + this.props.token
    }}).then(res => {
      data[name].options = res.data.items.map(option => {
        return option[data[name].property];
      });
      this.props.set({ data });
    });
  }

  setValue(e) {
    this.props.set({ [e.target.name]: e.target.name });
  }

  render () {
    const { rows } = this.props;

    return (
      <form onSubmit={this.props.submitForm.bind(this)}>
        {rows.map(row => {
          return (
            <div className="row">
              {row.map(col => {
              switch (col.type) {
                case 'select': 
                  this.getOptions(col.name, col.endpoint);
                  return (
                    <div className="col col-form">
                      <Select key={'select-' + col.name} {...col} value={this.props.data[col.name].value} setValue={this.setValue.bind(this)}/>
                    </div>
                  );
                case 'custom':
                  return (col.custom());
                default: return (
                  <div className="col col-form">
                    <Input key={'input-' + col.name} {...col} value={this.props.data[col.name].value} setValue={this.setValue.bind(this)}/>
                  </div>
                )
              }})}
            </div>
          );
        })}
        <br/>
        <input className="btn btn-block btn-info" type="submit"/>
      </form>
    );
  }
}