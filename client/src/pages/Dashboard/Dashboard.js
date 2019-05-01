import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../../components/SearchBar/SearchBar.js';
import './Dashboard.scss';
import axios from 'axios';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      opportunities: {},
      partners: {}
    };
  }

  deleteOpportunity(id, index) {
    axios.delete('/api/opportunities/' + id)
      .then(res => {
        let opps = this.state.opportunities;
        opps.searchResult.items.splice(index, 1);
        this.setState({ opportunities: opps });
      })
      .catch(err => {
        alert('Error Deleting');
      });
  }

  deletePartner(id, index) {
    axios.delete('/api/partners/' + id)
    .then(res => {
      let partners = this.state.partners;
      partners.searchResult.items.splice(index, 1);
      this.setState({ partners });
    })
    .catch(err => {
      alert('Error Deleting');
    });
  }

  set(key, val) {
    this.setState({ [key]: val});
  }

  componentDidMount() {
    axios.get('/api/opportunities')
      .then(res => {
        this.setState({ opportunities: { searchResult: res.data} });
      });
    axios.get('/api/partners')
      .then(res => {
        this.setState({ partners: { searchResult: res.data }});
      });
  }

  render () {
    const opps = this.state.opportunities.searchResult ? this.state.opportunities.searchResult.items : [];
    const partners = this.state.partners.searchResult ? this.state.partners.searchResult.items : [];

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
              <Link className="btn btn-info" to="/dashboard/addpartner">Add Partner (Admin)</Link>
              <Link className="btn btn-info">Add User (Admin)</Link>
            </div>
          </div>
        </div>
        <br/>
        <h4>Opportunities</h4>
        <SearchBar
          url="/api/opportunities"
          set={(val) => { this.set('opportunities', val); }}
        />
        <br/>
        <ul className="list-group">
          {opps ? opps.map(({ name, partner_name, id }, i) => {
            return (
              <li className="list-group-item d-flex justify-content-between align-items-center">
                {name} - {partner_name}
                <div>
                  <Link className="btn btn-info btn-sm" to={'/opportunities/' + id}>View</Link>
                  <Link className="btn btn-warning btn-sm" to={`/dashboard/editopportunity/${id}`}>Edit</Link>
                  <Link 
                    className="btn btn-danger btn-sm"
                    onClick={() => {this.deleteOpportunity(id, i)}}>
                    Delete
                  </Link>
                </div>
              </li>
            );
          }) : 'Loading...'}
        </ul>
        <br/>
        <h4>Partners</h4>
        <SearchBar
          url="/api/partners"
          set={(val) => { this.set('partners', val); }}
        />
        <br/>
        <ul className="list-group">
          {partners ? partners.map(({ name, id }, i) => {
            return (
              <li className="list-group-item d-flex justify-content-between align-items-center">
                {name}
                <div>
                  <Link className="btn btn-warning btn-sm" to={`/dashboard/editpartner/${id}`}>Edit</Link>
                  <Link 
                    className="btn btn-danger btn-sm"
                    onClick={() => {this.deletePartner(id, i)}}>
                    Delete
                  </Link>
                </div>
              </li>
            );
          }) : 'Loading...'}
        </ul>
      </div>
    );
  }
}