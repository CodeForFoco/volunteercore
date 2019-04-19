import React, { Component } from 'react';
import Thumb from '../../components/OppThumb/OppThumb.js';
import './Opportunity.scss';

export default class Opportunties extends Component {
  constructor(props) {
    super(props);

    this.state = {
      popup: false,
      opps: [{
        id: 'test', active: 'test', name: 'Prepare Shipments', job_number: 'test', description: 'test', shift_hours: 'test', commitment_length: 'test', start_date: 'test', end_date: 'test', training_time_required: 'test', volunteers_needed: 'test', location_street: 'test', location_city: 'test', location_zip: 'test', tag_count: 'test', partner_name: 'Prepare Shipments', partner_id: 'test', partner_string: 'test', frequency: 'test', tags: 'test'
      }, {
        id: 'test', active: 'test', name: 'Prepare Shipments', job_number: 'test', description: 'test', shift_hours: 'test', commitment_length: 'test', start_date: 'test', end_date: 'test', training_time_required: 'test', volunteers_needed: 'test', location_street: 'test', location_city: 'test', location_zip: 'test', tag_count: 'test', partner_name: 'Prepare Shipments', partner_id: 'test', partner_string: 'test', frequency: 'test', tags: 'test'
      }, {
        id: 'test', active: 'test', name: 'Prepare Shipments', job_number: 'test', description: 'test', shift_hours: 'test', commitment_length: 'test', start_date: 'test', end_date: 'test', training_time_required: 'test', volunteers_needed: 'test', location_street: 'test', location_city: 'test', location_zip: 'test', tag_count: 'test', partner_name: 'Prepare Shipments', partner_id: 'test', partner_string: 'test', frequency: 'test', tags: 'test'
      }, {
        id: 'test', active: 'test', name: 'Prepare Shipments', job_number: 'test', description: 'test', shift_hours: 'test', commitment_length: 'test', start_date: 'test', end_date: 'test', training_time_required: 'test', volunteers_needed: 'test', location_street: 'test', location_city: 'test', location_zip: 'test', tag_count: 'test', partner_name: 'Prepare Shipments', partner_id: 'test', partner_string: 'test', frequency: 'test', tags: 'test'
      }]
    }
  }

  render () {
    return (
      <>
        <h1>Opportunities</h1>
        <form>
          <div class="form-group">
            <label for="exampleInputEmail1">Search Opportunities</label>
            <input type="text" class="form-control" placeholder="Search Opportunities"/>
            <br/><br/>
            {this.state.opps.map((val) => {
             return <Thumb {...val}/>;
            })}
          </div>
        </form>
      </>
    );
  }
}