import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import OppForm from '../../components/OppForm/OppForm.js';
import axios from 'axios';

export default class PutOpportuinty extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: null,
      name: 'Code',
      description: 'Code',
      shift_hours: 5,
      commitment_length: 5,
      start_date: 'Tue, 22 Nov 2011 06:00:00 GMT',
      end_date: 'Tue, 22 Nov 2011 06:00:00 GMT',
      training_time_required: 5,
      volunteers_needed: 5,
      location_street: 555,
      location_city: 'Fort Collins',
      location_state: 'CO',
      location_zip: 55555,
      partner_name: 'Code For FoCo',
      tags_string: 'coding',
    }
  }

  submitForm(e) {
    if (!this.state.id) {
      return alert('Error. Please reload page.');
    }

    e.preventDefault();
    let data = this.state;
    delete data.start_date;
    delete data.end_date;

    axios.put(`/api/opportunities/${this.state.id}`, data)
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

  componentDidMount() {
    let location = window.location.pathname;
    let id = location.substr(location.lastIndexOf('/') + 1);
    this.setState({ id }, () => {
      axios.get('/api/opportunities/' + id)
        .then(res => {
          this.setState(res.data);
        })
        .catch(err => {
          alert(err + '\n Please reload the page. :)');
        });
    });
  }

  render () {
    return (
      <div>
        <h1>Edit Opportunity</h1>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/dashboard" className="text-info">Dashboard</Link></li>
            <li className="breadcrumb-item">Edit Opportunity</li>
          </ol>
        </nav>
        <div className='card border border-warning'>
          <div className='card-header bg-warning text-light border-warning'>
            Thank you for using Volunteer Force!
          </div>
          <div className='card-body'>
            <OppForm 
              {...this.state}
              submitForm={this.submitForm.bind(this)}
              setByName={this.setByName.bind(this)}
              method='PUT'
              />
          </div>
        </div>
      </div>
    );
  }
}