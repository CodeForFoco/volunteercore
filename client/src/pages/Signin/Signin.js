import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import history from '../../utils/history';
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
    axios.post('/api/token/auth', {}, 
      { headers: { 
        Authorization: 'Basic ' + window.btoa(username + ':' + password)
      }})
      .then(res => {
        this.props.set({ token: res.data.token }, () => {
          window.localStorage.setItem('token', res.data.token);
          axios.get('/api/users/authenticated_user', { headers: {
            Authorization: 'Bearer ' + res.data.token
          }}).then(res => {
            this.props.set({ user: res.data });
          }).catch(err => {
            const message = err && err.response && err.response.data && err.response.data.message ? err.reponse.data.message : 'Error signing in. Please reload the page.';
            this.setState({ response: { type: 'alert-danger', text: message }});
          });
        });
      })
      .catch(err => {
        this.setState({ response: { type: 'alert-danger', text: err.response.data.message }});
      });
  }

  componentDidMount() {
    const { token, user } = this.props;
    if (token && user && user.roles) {
      if (user.roles.indexOf('Admin') !== -1) {
        history.push('/dashboard/opportunities/search');
      } else {
        history.push('/opportunities');
      }
    }
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