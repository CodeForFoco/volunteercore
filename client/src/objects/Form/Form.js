import React, { Component } from 'react';
import Input from '../Input/Input.js';

export default class Form extends Component {
  render () {
    const rows = this.props.rows;

    return (
      <form onSubmit={this.props.submitForm.bind(this)}>
        <i>* Asterisk indicates required field.</i>
        {rows.map((row, i) => {
          return (
            <div className="row" key={'form-row-' + i}>
              {row.map((item, i) => {
                return (
                  <div className="col" key={'form-col-' + i}>
                    <Input 
                      {...item}
                      value={item.value || this.props[item.name]}
                      setVal={this.props.setVal.bind(this)}
                    />
                  </div>
                );
              })}
            </div>
          );
        })}
        <input className={`btn btn-block btn-${this.props.color || 'info'}`} type="submit"/>
      </form>
    );
  }
}