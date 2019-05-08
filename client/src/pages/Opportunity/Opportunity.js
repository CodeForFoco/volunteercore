import React, { Component } from 'react';
import Wrap from '../../components/Wrap/Wrap.js';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class Opportunity extends Component {
  constructor(props) {
    super(props);

    this.state = {
      opportunity: {},
      id: this.props.match.params.ID
    }
  }

  componentDidMount() {
    axios.get('/api/opportunities/' + this.state.id)
      .then(res => {
        this.setState({ opportunity: res.data });
      })
      .catch(err => {
        alert(err);
      });
  }

  render () {
    const opp = this.state.opportunity;
    return (
      <Wrap>
        <h1>{opp.partner_name || 'Loading...'}</h1>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/opportunities" className="text-info">Opportunities</Link></li>
            <li className="breadcrumb-item">{opp.partner_name || 'Loading...'}</li>
          </ol>
        </nav>
        <div className="card">
          <div className="card-header">
            Volunteer for {opp.partner_name || 'Loading...'}
          </div>
          <div className="card-body">
            <h2><u>{opp.name}</u> - {opp.partner_name}</h2>
            <p>
              {opp.location_street}, {opp.location_city}, {opp.location_zip}
              - Job #{opp.job_number || '?'}
              - {opp.volunteers_needed} Volunteers needed
            </p>
            <p>{opp.description}</p>
            <p>Shift: {opp.shift_hours}hrs +
              {opp.training_time_hours ? (
                ` ${opp.training_time_hours}hrs of training`
              ) : ''}
            </p>
            <p>Date: {opp.start_date || 'Date?'} to {opp.end_date || 'Date?'}</p>
            <p>Commitment length: {opp.commitment_length}</p>
          </div>
        </div>
      </Wrap>
    );
  }
}
