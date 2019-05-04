// Wrapper for Dashboard
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Nav from '../Nav/Nav.js';
import './Dashboard.scss';

export default class Dashboard extends Component {
  render () {
    return (
      <div className="dash-page-wrap">
        <Nav/>
        <div className="dash">
          <Sidebar/>
          <div className="dash-content">
            {this.props.children || (
              <div>
                <h2>Welcome Back!</h2>
                <p>Choose an option below or use the sidebar for more options.</p>
                <div className="btn-group">
                  <Link 
                    className="btn btn-success"
                    to="/dashboard/addopportunity">
                    Add Opportunity
                  </Link>
                  <Link 
                    className="btn btn-info"
                    to="/dashboard/searchopportunity">
                    Search Opportunities
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

class Sidebar extends Component {
  render () {
    return (
      <div className="dash-side-bar">
        <h4 className="text-center">Dashboard</h4>
        <br/>
        <div className="dash-side-bar-items">
          <Link 
            className="btn btn-block text-left btn-secondary"
            to="/dashboard/opportunities/add">
            Opportunities
          </Link>
          <Link 
            className="btn btn-block text-left btn-secondary"
            onClick={() => { this.props.setPage('partners')}}>
            Partners
          </Link>
          <Link 
            className="btn btn-block text-left btn-secondary"
            onClick={() => { this.props.setPage('tags')}}>
            Tags
          </Link>
          <Link 
            className="btn btn-block text-left btn-secondary"
            onClick={() => { this.props.setPage('users')}}>
            Users
          </Link>
          <Link className="btn btn-block text-left btn-secondary text-muted" disabled>Settings</Link>
          <Link className="btn btn-block text-left btn-secondary text-muted" disabled>Help</Link>
        </div>
      </div>
    );
  }
}

