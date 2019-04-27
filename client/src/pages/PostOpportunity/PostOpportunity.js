import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import OppForm from '../../components/OppForm/OppForm.js';
import Input from '../../objects/Input/Input.js';
import helpers from '../../utils/helpers.js';

export default class AddOpportunity extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      description: '',
      shift_start: '',
      shift_end: '',
      commitment_length: '',
      next_date: '',
      start_date: '',
      end_date: '',
      training_time_required: '',
      volunteers_needed: '',
      location_street: '',
      location_city: '',
      location_state: '',
      location_zip: '',
      partner_name: '',
      frequency: '',
      tags: '',

      recurring: false
    }
  }

  submitForm(e) {

  }

  setByName(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  set(obj) {
    this.setState(obj);
  }

  render () {
    return (
      <div>
        <h1>Add Opportunity</h1>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/dashboard" className="text-info">Dashboard</Link></li>
            <li className="breadcrumb-item">Add Opportunity</li>
          </ol>
        </nav>
        <div className='card'>
          <div className='card-header'>
            Thank you for using Volunteer Force!
          </div>
          <div className='card-body'>
            <OppForm 
              {...this.state}
              submitForm={this.submitForm.bind(this)}
              setByName={this.setByName.bind(this)}
              set={this.set.bind(this)}
              />
          </div>
        </div>
      </div>
    );
  }
}