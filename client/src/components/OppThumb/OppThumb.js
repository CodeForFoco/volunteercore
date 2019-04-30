import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './OppThumb.scss';

export default class OpportunityThumb extends Component {
  render () {
    return (
      <div className='opp-thumb'>
        <Link to={`/opportunities/${this.props.id}`}>
          <h4><u>{this.props.name}</u> - {this.props.partner_name}</h4>
        </Link>
        <p>{this.props.location_street} {this.props.location_city}, {this.props.location_state}, {this.props.location_zip}</p>
        <p>{this.props.shift_hours} Hours - {this.props.frequency} - {this.props.commitment_length} - {this.props.commitment_length}</p>
        <div>
          <span className='badge badge-pill badge-primary'> Children </span>
          <span className='badge badge-pill badge-primary'> Art </span>
          <span className='badge badge-pill badge-primary'> Teaching </span>
          <span className='badge badge-pill badge-primary'> Cooking </span>       
        </div>
      </div>
    );
  }
}