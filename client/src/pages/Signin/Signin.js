import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Wrap from '../../components/Wrap/Wrap';
import Form from '../../objects/Form/Form.js';
import axios from 'axios';

export default class Signin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
    }
  }

  set(obj) {
    this.setState(obj);
  }

  submitForm(e) {
    e.preventDefault();
    const { username, password } = this.state;
    axios.post('/api/token/auth', {}, 
      { headers: { 
        Authorization: 'Basic ' + window.btoa(username + ':' + password)
      }})
      .then(res => {
        this.props.set({ token: res.data.token });
      })
      .catch(err => {
        alert('Authorization failed. Please try again.');
      });
  }

  render () {
    return (
      <Wrap {...this.props}>
        <div className="card">
          <div className="card-header">
            Welcome to Volunteer Force!
          </div>
          <div className="card-body">
            <h2>Sign In</h2>
            <p>Sign In below to access your dashboard. :)</p>
            <Form
              data={this.state}
              submitForm={this.submitForm.bind(this)}
              set={(e) => { this.set({ [e.target.name] : e.target.value }); }}
              color='info'
              rows={[[{
                label: 'Username',
                name: 'username'
              }], [{
                label: 'Password',
                name: 'password',
                type: 'password'
              }]]}
            />
          </div>
        </div>
      </Wrap>
    );
  }
}