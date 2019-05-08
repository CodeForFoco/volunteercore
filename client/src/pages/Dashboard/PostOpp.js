import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Dash from '../../components/Dashboard/Dashboard.js';
import Form from '../../objects/Form/Form.js';
import axios from 'axios';

/* export default class PostOpp extends Component {
  render () {
    return (

    );
  }
}*/

/*
  constructor(props) {
    super(props);

    this.state = {
      name: 'Code',
      description: 'Code',
      shift_hours: 5,
      commitment_length: 5,
      frequency: 'Every Monday',
      start_date: 'Tue, 22 Nov 2011 06:00:00 GMT',
      end_date: 'Tue, 22 Nov 2011 06:00:00 GMT',
      training_time_required: 5,
      volunteers_needed: 5,
      location_street: 555,
      location_city: 'Fort Collins',
      location_state: 'CO',
      location_zip: 55555,
      partner_name: 'Code For FoCo',
      tags_string: 'coding, children, painting'
    }
  }

  submitForm(e) {
    e.preventDefault();
    let data = this.state;
    delete data.start_date;
    delete data.end_date;

    axios.post('/api/opportunities', data)
      .then(res => {
        alert(JSON.stringify(res.data));
      })
      .catch(err => {
        alert(JSON.stringify(err.response.data));
      });
  }

  setByName(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render () {
    return (
      <Dash>
        <h2>Add Opportunity</h2>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><span className="text-info" style={{ cursor: 'pointer'}} onClick={() => {
              this.props.setPage('opportunities');
            }}>Search Opportunities</span></li>
            <li className="breadcrumb-item">Add Opportunity</li>
          </ol>
        </nav>
        <div className='card border border-info'>
          <div className='card-header bg-info text-light border-info'>
            Thank you for using Volunteer Force!
          </div>
          <div className='card-body'>
            <Form
              {...this.state}
              submitForm={this.submitForm.bind(this)}
              setVal={this.setByName.bind(this)}
              rows={[[{
                label: 'Partner',
                name: 'partner_name',
              }], [{
                label: 'Address',
                name: 'location_street'
              }, {
                label: 'City',
                name: 'location_city'
              }], [{
                label: 'State',
                name: 'location_state',
                value: 'CO',
                disabled: true
              }, {
                label: 'Zip',
                name: 'location_zip',
                type: 'number'
              }], [{
                label: 'Opportunity Name',
                name: 'name'
              }], [{
                label: 'Shift Hours',
                name: 'shift_hours',
                type: 'number'
              }], [{
                label: 'Start Date',
                name: 'start_date',
                type: 'date',
                optional: true
              }, {
                label: 'End Date',
                name: 'end_date',
                type: 'date',
                optional: true
              }], [{
                label: 'Commitment Length',
                ex: 'days',
                name: 'commitment_length',
                type: 'number',
                optional: true
              }], [{
                label: 'Frequency',
                ex: 'Eg. "Every other Friday"',
                name: 'frequency',
                optional: true
              }], [{
                label: 'Training Required',
                ex: '(hours)',
                name: 'training_time_required',
                type: 'number',
                optional: true
              }], [{
                label: 'Volunteers Needed',
                name: 'volunteers_needed',
                type: 'number',
                optional: true
              }], [{
                label: 'Tags',
                ex: 'Eg. "children, art"',
                name: 'tags_string',
                placeholder: 'Enter Tags (Eg. children, art, games)',
                optional: true
              }], [{
                label: 'Description',
                name: 'description',
                type: 'textarea'
              }]]}
            />
          </div>
        </div>
      </Dash>
    );
  }
}
*/