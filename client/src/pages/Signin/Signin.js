import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Wrap from '../../components/Wrap/Wrap';
import Form from '../../objects/Form/Form.js';
import Alert from '../../components/Alert/Alert.js';
import axios from 'axios';

export default class Signin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      response: {}
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
        this.props.set({ token: res.data.token }, () => {
          window.localStorage.setItem('token', res.data.token);
          axios.get('/api/users/1', { headers: {
            Authorization: 'Bearer ' + res.data.token
          }}).then(() => {
            this.props.set({ user: { admin: true }});
          });
        });
      })
      .catch(err => {
        this.setState({ response: { type: 'alert-danger', text: err.statusText }});
      });
  }

  componentDidMount() {
    if (this.props.token) {
      this.setState({ response: { 
        type: 'alert-success', 
        text: <>You signed in! <Link to="/dashboard/opportunities/search">Click here</Link> to go to the dashboard.</>
      }});
    }
  }

  render () {
    return (
      <Wrap {...this.props}>
        <div className="card">
          <div className="card-header">
            Hello from Volunteer Force!
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
            <br/>
            <Alert {...this.state.response}/>
          </div>
        </div>
      </Wrap>
    );
  }
}