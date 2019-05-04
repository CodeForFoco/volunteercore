import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Wrap from '../../components/Wrap/Wrap.js';
import Input from '../../objects/Input/Input.js';
import Alert from '../../components/Alert/Alert.js';
import axios from 'axios';

export default class PutPartner extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        email: '',
        username: 'Undefined',
        roles: []
      },
      formResult: {
        text: '',
        type: ''
      }
    }
  }

  submitForm(e) {
    e.preventDefault();
    axios.put('/api/users/' + this.props.match.params.ID, this.state.user)
      .then(res => {
        this.setState({
          formResult: {
            text: 'User Edited!',
            type: 'alert-warning'
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

  componentDidMount() {
    axios.get('/api/users/' + this.props.match.params.ID)
      .then(res => {
        console.log(res.data);
        this.setState({ user: res.data });
      });
  }

  render () {
    return (
      <Wrap>
        <h1>Edit User</h1>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/dashboard" className="text-info">Dashboard</Link></li>
            <li className="breadcrumb-item">Edit User</li>
          </ol>
        </nav>
        <div className='card border border-warning'>
          <div className='card-header bg-warning text-light border-warning'>
            Thank you for using Volunteer Force!
          </div>
          <div className='card-body'>
            <Alert {...this.state.formResult}/>
            <PutUserForm
              {...this.props}
              {...this.state.user}
              submitForm={this.submitForm.bind(this)}
              setByName={this.setByName.bind(this)}
            />
          </div>
        </div>
      </Wrap>
    );
  }
}

class PutUserForm extends Component {
  render () {
    return (
      <form onSubmit={this.props.submitForm.bind(this)}>
        <h3>Edit <u>{this.props.username}</u></h3>
        <p>Asterisk * indicates a required field.</p>
        <Input
          label="* Username"
          name="username"
          placeholder="Enter Username"
          set={this.props.setByName.bind(this)}
          value={this.props.username}
        />
        <Input
          label="Email"
          name="email"
          placeholder="Enter Email"
          set={this.props.setByName.bind(this)}
          type="email"
          value={this.props.email}
        />
        <Input
          label="* Password"
          name="password"
          placehlder="Enter Password"
          set={this.props.setByName.bind(this)}
          type="password"
          value={this.props.password}
        />
        <input className="btn btn-warning btn-block" type="submit" value="Submit"/>
      </form>
    );
  }
}