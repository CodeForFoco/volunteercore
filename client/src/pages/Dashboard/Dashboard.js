import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import OppThumb from '../../components/OppThumb/OppThumb.js';
import './Dashboard.scss';
import axios from 'axios';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      opps: {}
    };
  }

  search(query) {
    axios.get('/api/opportunities')
      .then(res => {
        this.setState({ opps: res.data });
      })
      .catch(err => {
        alert('Error. Please try again');
      })
  }

  componentDidMount() {
    if (!this.state.opps || ! this.state.opps.items) {
      this.search();
    }
  }

  render () {
    const items = this.state.opps ? this.state.opps.items : [];

    return (
      <div>
        <h1>Dashboard</h1>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item active">Dashboard</li>
            <li className="breadcrumb-item active" aria-current="page"></li>
          </ol>
        </nav>
        <div className="card mb-3">
          <div className="card-header">
            Welcome back, Jordan!
          </div>
          <div className="card-body">
            <p>Add an opportunity below or, edit an existing one.</p>
            <div className="btn-group" role="group" aria-label="Basic example">
              <Link className="btn btn-info" to="/dashboard/addopportunity">Add Opportunity</Link>
              <Link className="btn btn-success">Add User (Admin)</Link>
              <Link className="btn btn-success">Add Organization (Admin)</Link>
            </div>
          </div>
        </div>
        <br/>
        <h4>Opportunities</h4>
        <form>
          <label>Search Opportunities</label>
          <div className="input-group">
            <input type="text" className="form-control" placeholder="Search Opportunities"/>
            <div className="input-group-append">
              <button className="btn btn-primary">Search</button>
            </div>
          </div>
        </form><br/>
        <ul className="list-group">
          {items ? items.map(({ name, partner_name, id }) => {
            return (
              <li className="list-group-item d-flex justify-content-between align-items-center">
                {name} - {partner_name}
                <div>
                  <Link className="btn btn-info btn-sm">View</Link>
                  <Link className="btn btn-warning btn-sm" to={`/dashboard/editopportunity/${id}`}>Edit</Link>
                  <Link className="btn btn-danger btn-sm">Delete</Link>
                </div>
              </li>
            );
          }) : 'Loading...'}
        </ul>
      </div>
    );
  }
}