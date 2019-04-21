import React, { Component } from 'react';
import Thumb from '../../components/OppThumb/OppThumb.js';
import axios from 'axios';
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

  componentDidMount() {
    axios.get('/api/opportunities')
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        alert(err);
      });
  }

  render () {
    return (
      <>
        <h1>Opportunities</h1>
        <form>
          <label>Search Partners</label>
          <div className="input-group">
            <input type="text" className="form-control" placeholder="Search Partners"/>
            <div className="input-group-append">
              <button className="btn btn-primary">Search</button>
            </div>
          </div><br/><br/>
            {this.state.opps.map((val) => {
             return <Thumb {...val}/>;
            })}
        </form>
      </>
    );
  }
}