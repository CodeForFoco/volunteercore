import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Input from '../../objects/Input/Input.js';
import Alert from '../../components/Alert/Alert.js';
import axios from 'axios';

export default class PutPartner extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.ID,
      name: '',
      partner: {
        partner_name: 'Edit "Loading..."'
      },
      formResult: {
        text: '',
        type: ''
      }
    }
  }

  submitForm(e) {
    e.preventDefault();
    const { name } = this.state;

    axios.put('/api/partners/' + this.state.id, { name })
      .then(res => {
        this.setState({
          formResult: {
            text: 'Partner Edited!',
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
    axios.get('/api/partners/' + this.state.id)
      .then(res => {
        this.setState({ partner: res.data, name: res.data.name });
      });
  }

  render () {
    return (
      <div>
        <h1>Edit Partner</h1>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/dashboard" className="text-info">Dashboard</Link></li>
            <li className="breadcrumb-item">Edit Partner</li>
          </ol>
        </nav>
        <div className='card border border-warning'>
          <div className='card-header bg-warning text-light border-warning'>
            Thank you for using Volunteer Force!
          </div>
          <div className='card-body'>
            <Alert {...this.state.formResult}/>
            <PutPartnerForm
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

class PutPartnerForm extends Component {
  render () {
    return (
      <form onSubmit={this.props.submitForm.bind(this)}>
        <h3>Edit <u>{this.props.partner.name}</u></h3>
        <p>Asterisk * indicates a required field.</p>
        <Input
          label="Organization Name"
          name="name"
          placeholder="Enter Name"
          set={this.props.setByName.bind(this)}
          value={this.props.name}
        />
        <input className="btn btn-warning btn-block" type="submit" value="Submit Changes"/>
      </form>
    );
  }
}