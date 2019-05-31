import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './DashListItem.scss';

export default class DashListItem extends Component {
  render () {
    return (
      <li className="dash-list-item list-group-item d-flex">
        {this.props.text}
        <div className="dash-list-item-btns">
          <Link className="btn btn-info btn-sm" to={`/dashboard/${this.props.endpoint}/view/${this.props.id}`}>View</Link>
          <Link 
            className="btn btn-warning btn-sm" 
            to={`/dashboard/${this.props.endpoint}/edit/${this.props.id}`}>
            Edit
          </Link>
          <button className="btn btn-danger btn-sm" onClick={this.props.deleteItem.bind(this)}>Delete</button>
        </div>
      </li>
    );
  }
}