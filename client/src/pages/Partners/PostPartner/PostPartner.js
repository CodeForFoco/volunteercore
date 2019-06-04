import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Wrap from '../../../components/Wrap/Wrap';
import Form from '../../../objects/Form/Form.js';
import Alert from '../../..//components/Alert/Alert.js';
import axios from 'axios';
import parse from '../../../utils/parseFields';

import endpoints from '../../../utils/endpoints.js';

export default class PostOpportunity extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {},
      response: {}
    };
  }

  removeDashes(str) {
    let copy = str;
    return copy.replace(/-/gi, '');
  }

  submitForm(e) {
    e.preventDefault();
    let { data } = this.state;

    data = parse.parseData(data, 'partners');

    axios.post('/api/partners', data, {
      headers: {
        Authorization: 'Bearer ' + this.props.token
      }
    })
      .then(res => {
        this.setState({ response: {
          type: 'alert-success',
          text: 'Success!'
        }});
      })
      .catch(err => {
        this.setState({ response: {
          type: 'alert-danger',
          text: err.response.data.message ?
            'Error: ' + err.response.data.message : err.message
        }});
      });
  }

  setValue(obj) {
    let data = this.state.data;
    let key = Object.keys(obj)[0];
    data[key] = obj[key];
    this.setState({ data });
  }

  render () {
    return (
      <Wrap  {...this.props}>
        <h3>Add Partners</h3>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link
                className="text-info"
                to={'/partners'}>
                Search Partners
              </Link>
            </li>
            <li className="breadcrumb-item">
              Add Partners
            </li>
          </ol>
        </nav>
        <div className="card border-info">
          <div className="card-header bg-info border-info text-light">
            Thanks for using Volunteer Core!
          </div>
          <div className="card-body">
            <Form
              submitForm={this.submitForm.bind(this)}
              data={this.state.data}
              fields={endpoints.partners.fields}
              setValue={this.setValue.bind(this)}
              submitBtnClass='btn-info'
              token={this.props.token}
            />
            <br/>
            <Alert type={this.state.response.type} text={this.state.response.text}/>
          </div>
        </div>
      </Wrap>
    );
  }
}
