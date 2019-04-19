import React, { Component } from 'react';
import './Partners.scss';

export default class Partners extends Component {
  constructor(props) {
    super(props);

    this.state = {
      opps: [{
        id: 'test', active: 'test', name: 'Prepare Shipments', job_number: 'test', description: 'test', shift_hours: 'test', commitment_length: 'test', start_date: 'test', end_date: 'test', training_time_required: 'test', volunteers_needed: 'test', location_street: '5555 Some Ave', location_city: 'Fort Collins', location_zip: '55555', tag_count: 'test', partner_name: 'Super Organization', partner_id: 'test', partner_string: 'test', frequency: 'test', tags: 'test'
      }, {
        id: 'test', active: 'test', name: 'Prepare Shipments', job_number: 'test', description: 'test', shift_hours: 'test', commitment_length: 'test', start_date: 'test', end_date: 'test', training_time_required: 'test', volunteers_needed: 'test', location_street: '5555 Some Ave', location_city: 'Fort Collins', location_zip: '55555', tag_count: 'test', partner_name: 'Super Organization', partner_id: 'test', partner_string: 'test', frequency: 'test', tags: 'test'
      }, {
        id: 'test', active: 'test', name: 'Prepare Shipments', job_number: 'test', description: 'test', shift_hours: 'test', commitment_length: 'test', start_date: 'test', end_date: 'test', training_time_required: 'test', volunteers_needed: 'test', location_street: '5555 Some Ave', location_city: 'Fort Collins', location_zip: '55555', tag_count: 'test', partner_name: 'Super Organization', partner_id: 'test', partner_string: 'test', frequency: 'test', tags: 'test'
      }, {
        id: 'test', active: 'test', name: 'Prepare Shipments', job_number: 'test', description: 'test', shift_hours: 'test', commitment_length: 'test', start_date: 'test', end_date: 'test', training_time_required: 'test', volunteers_needed: 'test', location_street: '5555 Some Ave', location_city: 'Fort Collins', location_zip: '55555', tag_count: 'test', partner_name: 'Super Organization', partner_id: 'test', partner_string: 'test', frequency: 'test', tags: 'test'
      }]
    }
  }

  render () {
    return (
      <>
        <h1>Partners</h1>
        <form>
          <label>Search Partners</label>
          <div className="input-group">
            <input type="text" className="form-control" placeholder="Search Partners"/>
            <div className="input-group-append">
              <button className="btn btn-primary">Search</button>
            </div>
          </div>
          <br/><br/>
          {this.state.opps.map((val) => {
            return (
              <div>
                <h4><u>{val.partner_name}</u></h4>
                <p>{`${val.location_street}, ${val.location_city}, ${val.location_zip}`}</p>
                <div>
                  <span className='badge badge-pill badge-primary'> Children </span>
                  <span className='badge badge-pill badge-primary'> Art </span>
                  <span className='badge badge-pill badge-primary'> Teaching </span>
                  <span className='badge badge-pill badge-primary'> Cooking </span>       
                </div>
                <br/>
              </div>
            );
          })}
        </form>
      </>
    );
  }
}