import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class DashListItem extends Component {
  render () {
    return (
      <li className="list-group-item d-flex justify-content-between align-items-center">
        {this.props.text}
        <div>
          <Link className="btn btn-info btn-sm" to={`/dashboard/${this.props.endpoint}/view/${this.props.id}`}>View</Link>
          <Link 
            className="btn btn-warning btn-sm" 
            to={`/dashboard/${this.props.endpoint}/edit`}>
            Edit
          </Link>
          <button className="btn btn-danger btn-sm">Delete</button>
        </div>
      </li>
    );
  }
}