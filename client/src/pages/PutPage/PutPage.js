import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Dash from '../../components/Dashboard/Dashboard.js';
import Form from '../../objects/Form/Form.js';
import Alert from '../../components/Alert/Alert.js';
import axios from 'axios';

import endpoints from '../../utils/endpoints.js';

export default class PostPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {},
      response: {}
    };
  }

  submitForm(e) {
    e.preventDefault();
    const { data } = this.state;
    const endpoint = this.props.match.params.endpoint;

    axios.put(`/api/${endpoint}/${data.id}`, data)
      .then(() => {
        this.setState({
          response: {
            type: 'alert-success',
            text: 'Success!'
          }
        })
      })
      .catch(err => {
        this.setState({
          response: {
            type: 'alert-danger',
            text: err.response.data.message ? 
              'Error: ' + err.response.data.message : err.message
          }
        })
      });
  }

  setByName(e) {
    let data = this.state.data;
    data[e.target.name] = e.target.value;
    this.setState({ data });
  }

  componentDidMount() {
    axios.get(`/api/${this.props.match.params.endpoint}/${this.props.match.params.id}`)
      .then(res => {
        this.setState({ data: res.data });
      })
      .catch(err => {
        this.setState({ response: err });
      })
  }

  render () {
    const endpoint = this.props.match.params.endpoint;
    return (
      <Dash>
        <h3>Edit {endpoint}</h3>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link 
                className="text-info"
                to={`/dashboard/${endpoint}/search`}>
                Search {endpoint}
              </Link>
            </li>
            <li className="breadcrumb-item">
              Edit {endpoint}
            </li>
          </ol>
        </nav>
        <div className="card border-warning">
          <div className="card-header bg-warning border-warning text-light">
            Thanks for using Volunteer Force!
          </div>
          <div className="card-body">
            <Form
              submitForm={this.submitForm.bind(this)}
              data={this.state.data}
              rows={endpoints[endpoint].rows || []}
              set={this.setByName.bind(this)}
              color='warning'
            />
            <br/>
            <Alert type={this.state.response.type} text={this.state.response.text}/>
          </div>
        </div>
      </Dash>
    );
  }
}