import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class DashListItem extends Component {
  render () {
    return (
      <li className="list-group-item d-flex justify-content-between align-items-center">
        {this.props.text}
        <div>
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