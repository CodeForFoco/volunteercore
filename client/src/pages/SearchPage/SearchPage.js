import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Dash from '../../components/Dashboard/Dashboard.js';

export default class SearchPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      endpoint: this.props.match.params.endpoint || 'opportunities/search',
      data: {},
      searchResult: {},
      searchError: {}
    };
  }

  render () {
    return (
      <Dash>
        <h2>{this.state.endpoint}</h2>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link className="text-info" to="/dashboard/opportunities/search">Search {this.state.endpoint}</Link>
            </li>
            <li className="breadcrumb-item">Add Opportunity</li>
          </ol>
        </nav>
      </Dash>
    );
  }
}