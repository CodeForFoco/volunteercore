// Wrapper for Dashboard
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Nav from '../Nav/Nav.js';
import './Dashboard.scss';

export default class Dashboard extends Component {
  render () {
    return (
      <div className="dash-page-wrap">
        <Nav {...this.props}/>
        <div className="dash">
          <Sidebar {...this.props}/>
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
            to="/dashboard/opportunities/search">
            Opportunities
          </Link>
          <Link 
            className="btn btn-block text-left btn-secondary"
            to="/dashboard/partners/search">
            Partners
          </Link>
          <Link 
            className="btn btn-block text-left btn-secondary"
            to="/dashboard/tag_categories/search">
            Tags
          </Link>
          {this.props.user && this.props.user.admin ? (
            <Link 
              className="btn btn-block text-left btn-secondary"
              to="/dashboard/users/search">
              Users
            </Link>
          ) : (
            <span className="btn btn-block text-left btn-secondary btn-disabled text-danger" disabled>
              Users
            </span>
          )}
          <Link className="btn btn-block text-left btn-secondary text-muted" disabled to="/">Settings</Link>
          <Link className="btn btn-block text-left btn-secondary text-muted" disabled to="/">Help</Link>
        </div>
      </div>
    );
  }
}

