import React, { Component } from 'react';

export default class ArrayInput extends Component {
  addElement() {

  }

  removeElement(index) {

  }

  render () {
    return (
      <div>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
          />
          <div className="input-group-append">
            <button className="btn btn-info">Add</button>
          </div>
        </div>
      </div>
    );
  }
}