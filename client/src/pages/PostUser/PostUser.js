import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Wrap from '../../components/Wrap/Wrap.js';
import Input from '../../objects/Input/Input.js';
import Alert from '../../components/Alert/Alert.js';
import axios from 'axios';

export default class PostUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
      roles: '',
      formResult: {
        text: '',
        type: ''
      }
    }
  }

  submitForm(e) {
    e.preventDefault();
    const { email, username, password } = this.state;

    axios.post('/api/users', { email, username, password })
      .then(res => {
        this.setState({
          formResult: {
            text: 'User Added!',
            type: 'alert-success'
          }
        });
      })
      .catch(err => {
        this.setState({
          formResult: {
            text: err.response.data.message,
            type: 'alert-danger'
          }
        })
      });
  }

  setByName(e) {
    this.setState({ [e.target.name]: e.target.value});
  }

  render () {
    return (
      <Wrap>
        <h1>Add User</h1>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/dashboard" className="text-info">Dashboard</Link></li>
            <li className="breadcrumb-item">Add User</li>
          </ol>
        </nav>
        <div className='card border border-info'>
          <div className='card-header bg-info text-light border-info'>
            Thank you for using Volunteer Force!
          </div>
          <div className='card-body'>
            <Alert {...this.state.formResult}/>
            <PostUserForm
              {...this.props}
              {...this.state}
              submitForm={this.submitForm.bind(this)}
              setByName={this.setByName.bind(this)}
            />
          </div>
        </div>
      </Wrap>
    );
  }
}

class PostUserForm extends Component {
  render () {
    return (
      <form onSubmit={this.props.submitForm.bind(this)}>
        <p>Asterisk * indicates a required field.</p>
        <Input
          label="Email"
          name="email"
          placeholder="Enter Email"
          set={this.props.setByName.bind(this)}
          type="email"
          value={this.props.email}
        />
        <Input
          label="* Username"
          name="username"
          placeholder="Enter Username"
          set={this.props.setByName.bind(this)}
          value={this.props.username}
        />
        <Input
          label="* Password"
          name="password"
          placehlder="Enter Password"
          set={this.props.setByName.bind(this)}
          type="password"
          value={this.props.password}
        />
        <input className="btn btn-info btn-block" type="submit" value="Submit"/>
      </form>
    );
  }
}