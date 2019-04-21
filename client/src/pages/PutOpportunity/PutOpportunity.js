import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class AddOpportunity extends Component {
  render () {
    return (
      <div>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/dashboard" className="text-info">Dashboard</Link></li>
            <li className="breadcrumb-item">Add Opportunity</li>
          </ol>
        </nav>
        <h2>Add Opportunity</h2><br/>
        <div className='card'>
          <div className='card-header'>
            Thank you for using Volunteer Force!
          </div>
          <div className='card-body'>
            <AddOpportunityForm/>
          </div>
        </div>
      </div>
    );
  }
}

/*
IN FORM
name, description, shift_hours, commitment_length,
start_date, end_date, training_time_required, volunteers_needed,
location_street, location_city, location_zip,
partner_name (organization), frequency, tags
*/

/*
NOT IN FORM (Not user input, dealt with in background)
_id, active, job_number, tag_count, partner_id, partner_string

*/

class Input extends Component {
  render () { 
    return (
      <div className="form-group">
        <label className="control-label">{this.props.label || this.props.name}</label>
        <input className="form-control" type={this.props.type || 'text'} name={this.props.name} placeholder={this.props.placeholder}/>
      </div>
    );
  }
}

class PutOpportunityForm extends Component {
  render () {
    return (
      <form>
        <p>Note to self: sanatize this input. Opportunity templates?</p>
        <p>* Asterisk indicates a required field.</p>
        <div className="form-group">
          <label className="control-label" for="disabledInput">* Organization Name</label>
          <input className="form-control" id="disabledInput" type="text" value="Your Organization" disabled/>
        </div>
        <label>* Opportunity Location</label>
        <div className="row">
          <div className="col-sm-12 col-md">
            <Input
              label="* Address"
              name="location_street"
              placeholder="Enter Address"
            />
          </div>
          <div className="col-sm-12 col-md">
            <Input
              label="* City"
              name="location_city"
              placeholder="Enter Location"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12 col-md">
            <Input
              label="* State"
              name="location_state"
              placeholder="Enter State"
            />
          </div>
          <div className="col-sm-12 col-md">
            <Input
              label="* Zip"
              name="location_zip"
              placeholder="Enter Zip"
              type="number"
            />
          </div>
        </div>
        <Input
          label="* Name (Eg. Prepare Shipments)"
          name="name"
          placeholder="Enter name"
        />
        <Input
          label="* Shift Hours"
          name="shift_hours"
          placeholder="Enter Hours"
          type="number"
        />
        <Input
          label="* Commitment Length **DROPDOWN?**"
          name="commitment_length"
          placeholder="Enter Months"
          type="number"
        />
        <Input
          label="* Start Date **ONE TIME CASE?**"
          name="start_date"
          type="date"
        />
        <Input
          label="* End Date **ONE TIME CASE?**"
          name="end_date"
          type="date"
        />
        <Input
          label="Training Time Required (hours) **NO TRAINING?**"
          name="training_time_required"
          placeholder="Enter Hours"
          type="number"
        />
        <Input
          label="* Volunteers needed"
          name="volunteers_needed"
          placeholder="Enter Number of Volunteers"
          type="number"
        />
        <Input
          label="Frequency (Eg. Every 5 months)"
          name="frequency"
          placeholder="Enter Frequency"
        />
        <label>Tags</label>
        <div>
          <span className="badge badge-primary badge-pill">Painting</span>
          <span className="badge badge-primary badge-pill">Children</span>
          <span className="badge badge-primary badge-pill">Fun</span>
        </div>
        <br/>
        <div className="input-group">
          <select class="custom-select">
            <option selected>Add Tag...</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
        </div>
        <br/>
        <div className="form-group">
          <label className="control-label">* Description</label>
          <textarea className="form-control" name="description" placeholder="Enter Description (Minimum 100 characters)"/>
        </div>
        <p className="text-success text-center">Submiting opportunity...</p>
        <input type="submit" className="btn btn-success btn-block"/>
      </form>
    );
  }
}