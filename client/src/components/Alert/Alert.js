import React, { Component } from 'react';

export default class Alert extends Component {

  render () {
    if (!this.props.text) {
      return '';
    }
    
    return (
      <div className={`alert ${this.props.type ? this.props.type : 'alert-primary'}`} role="alert">
        {this.props.text}
      </div>
    );
  }
}