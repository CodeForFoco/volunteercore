import React, { Component } from 'react';
import Input from '../Input/Input.js';

export default class Form extends Component {
  renderItem(item, key) {
    if (item.component) {
      let C = item.component;
      return <C {...item} {...this.props} key={key} value={this.props.data[item.name]} setValue={this.props.setValue.bind(this)}/>
    }
    return <Input {...item} {...this.props} key={key} value={this.props.data[item.name]} setValue={this.props.setValue.bind(this)}/>
  }

  render () {
    const { fields } = this.props;

    return (
      <form onSubmit={this.props.submitForm.bind(this)}>
        <i>* Asterisk indicates required field.</i>
<<<<<<< HEAD
        {Array.isArray(fields) ? fields.map((item, i) => {
          if (Array.isArray(item)) {
            return (
              <div className="row" key={`row-${i}`}>
                {item.map((child, k) => {
                  return (
                    <div className="col" key={`col-${i}-${k}`}>
                      {this.renderItem(child, item.name)}
                    </div>
                  );
                })}
              </div>
            );
          }
          return this.renderItem(item, `item-${i}`);
        }) : <p className="text-danger">INVALID FORM</p>}
        <input type="submit" className={(this.props.submitBtnClass || 'btn-secondary') + " btn btn-block"}></input>
=======
        {rows.map((row, i) => {
          return (
            <div className="row" key={'form-row-' + i}>
              {row.map((item, i) => {
                return (
                  <div className="col" key={'form-col-' + i}>
                    <Input 
                      {...item}
                      value={item.value || this.props.data[item.name]}
                      setValue={this.props.set.bind(this)}
                    />
                  </div>
                );
              })}
            </div>
          );
        })}
        {this.props.disableSubmit ? '' : (
          <input className={`btn btn-block btn-${this.props.color || 'primary'}`} type="submit"/>
        )}
>>>>>>> react
      </form>
    );
  }
}