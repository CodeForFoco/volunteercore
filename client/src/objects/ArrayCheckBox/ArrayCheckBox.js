import React, { Component } from 'react';

// Given list of options, returns options selected
// Ex: ['Admin', 'User'] -> User clicks 'Admin' -> returns ['Admin']
export default class ArrayCheckBox extends Component {
  toggleItem(item) {
    let myList = this.props.data[this.props.name] || [];
    if (myList.indexOf(item) === -1) {
      myList.push(item);
    } else {
      myList.splice(myList.indexOf(item), 1);
    }
    this.props.setValue({ [this.props.name]: myList });
  }

  render () {
    const list = this.props.list;
    let myList = this.props.data[this.props.name] || [];

    return (
      <div>
        {Array.isArray(list) ? list.map((item, i) => {
          return (
            <div className="form-check" key={`check-item-${i}`}>
              <input type="checkbox" className="form-check-input" onChange={() => this.toggleItem(item)} checked={myList.indexOf(item) !== -1}/>
              <label className="form-check-label">{ item }</label>
            </div>
          );
        }) : 'Invalid ArrayCheckBox'}
      </div>
    );
  }
}