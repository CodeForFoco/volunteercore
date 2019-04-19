import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.scss';

export default class Dashboard extends Component {
  render () {
    return (
      <div>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item active">Dashboard</li>
            <li className="breadcrumb-item active" aria-current="page"></li>
          </ol>
        </nav>
        <div className="card mb-3">
          <h3 className="card-header">Dashboard</h3>
          <div className="card-body">
            <h5 className="card-title">Welcome back, Jordan!</h5>
            <p>Add an opportunity below.</p>
            <p>To edit an opportunity, scroll down! :)</p>
            <div className="btn-group" role="group" aria-label="Basic example">
              <Link className="btn btn-info" to="/dashboard/addopportunity">Add Opportunity</Link>
              <Link className="btn btn-success">Add User (Admin-only)</Link>
            </div>
          </div>
        </div>
        <br/>
        <h4>Your Opportunities</h4>
        <br/>
        <ul className="list-group">
          <li className="list-group-item d-flex align-items-center">
            Cras justo odio
            <div className="opp-badge">
              <span className="badge badge-info badge-pill">View</span>
              <span className="badge badge-warning badge-pill">Edit</span>
              <span className="badge badge-danger badge-pill">Delete</span>
            </div>
          </li>
          <li className="list-group-item d-flex align-items-center">
            Cras justo odio
            <div className="opp-badge">
              <span className="badge badge-info badge-pill">View</span>
              <span className="badge badge-warning badge-pill">Edit</span>
              <span className="badge badge-danger badge-pill">Delete</span>
            </div>
          </li>
          <li className="list-group-item d-flex align-items-center">
            Cras justo odio
            <div className="opp-badge">
              <span className="badge badge-info badge-pill">View</span>
              <span className="badge badge-warning badge-pill">Edit</span>
              <span className="badge badge-danger badge-pill">Delete</span>
            </div>
          </li>
        </ul>
      </div>
    );
  }
}