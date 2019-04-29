import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Input from '../../objects/Input/Input.js';
import axios from 'axios';

export default class PostPartner extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: ''
    }
  }

  submitForm(e) {
    e.preventDefault();

  }

  setByName(e) {
    this.setState({ [e.target.name]: e.target.value});
  }

  render () {
    return (
      <div>
        <h1>Add Partner</h1>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/dashboard" className="text-info">Dashboard</Link></li>
            <li className="breadcrumb-item">Add Partner</li>
          </ol>
        </nav>
        <div className='card border border-info'>
          <div className='card-header bg-info text-light border-info'>
            Thank you for using Volunteer Force!
          </div>
          <div className='card-body'>
            <PostPartnerForm
              {...this.props}
              {...this.state}
              submitForm={this.submitForm.bind(this)}
              setByName={this.setByName.bind(this)}
            />
          </div>
        </div>
      </div>
    );
  }
}

class PostPartnerForm extends Component {
  render () {
    return (
      <form onSubmit={this.props.submitForm.bind(this)}>
        <p>Asterisk * indicates a required field.</p>
        <Input
          label="Organization Name"
          name="name"
          placeholder="Enter Name"
          set={this.props.setByName.bind(this)}
          value={this.props.name}
        />
        <input className="btn btn-info btn-block" type="submit" value="Submit"/>
      </form>
    );
  }
}