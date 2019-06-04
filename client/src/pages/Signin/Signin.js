import React, { Component } from 'react';
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

  setValue(obj) {
    this.setState(obj);
  }

  submitForm(e) {
    e.preventDefault();
    const { username, password } = this.state;
    axios.post('/api/auth/login', {}, 
      { headers: { Authorization: 'Basic ' + window.btoa(username + ':' + password) }})
      .then(res => {
        axios.get('/api/users/authenticated_user')
          .then(res => {
            this.props.set({ user: res.data });
          })
          .catch(err => {
            this.setState({ response: { type: 'alert-danger', text: err.response.data.message }});
          });
      })
      .catch(err => {
        this.setState({ response: { type: 'alert-danger', text: err.response.data.message }});
      });
  }

  render () {
    return (
      <Wrap {...this.props}>
        <div className="card">
          <div className="card-header">
            Hello from Volunteer Core!
          </div>
          <div className="card-body">
            <h2>Sign In</h2>
            <p>Sign In below to access your dashboard. :)</p>
            <Form
              data={this.state}
              submitForm={this.submitForm.bind(this)}
              setValue={this.setValue.bind(this)}
              submitBtnClass='btn-info'
              fields={[{
                name: 'username'
              }, {
                name: 'password',
                type: 'password'
              }]}
            />
            <br/>
            <Alert {...this.state.response}/>
          </div>
        </div>
      </Wrap>
    );
  }
}