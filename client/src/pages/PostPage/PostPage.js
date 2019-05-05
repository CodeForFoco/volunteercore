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
      data: {
        name: 'Code',
        description: 'Code',
        shift_hours: 5,
        commitment_length: 5,
        frequency: 'Every Monday',
        /*start_date: 'Tue, 22 Nov 2011 06:00:00 GMT',
        end_date: 'Tue, 22 Nov 2011 06:00:00 GMT',*/
        training_time_required: 5,
        volunteers_needed: 5,
        location_street: 555,
        location_city: 'Fort Collins',
        location_state: 'CO',
        location_zip: 55555,
        partner_name: 'Code For FoCo',
        tags_string: 'coding, children, painting'
      },
      response: {}
    };
  }

  submitForm(e) {
    e.preventDefault();
    const { data } = this.state;
    const endpoint = this.props.match.params.endpoint;

    axios.post(`/api/${endpoint}`, data)
      .then(res => {
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

  render () {
    const endpoint = this.props.match.params.endpoint;
    console.log(endpoint);
    return (
      <Dash>
        <h3>Add {endpoint}</h3>
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
              Add {endpoint}
            </li>
          </ol>
        </nav>
        <div className="card border-info">
          <div className="card-header bg-info border-info text-light">
            Thanks for using Volunteer Force!
          </div>
          <div className="card-body">
            <Form
              submitForm={this.submitForm.bind(this)}
              data={this.state.data}
              rows={endpoints[endpoint].rows}
              set={this.setByName.bind(this)}
              color='info'
            />
            <br/>
            <Alert type={this.state.response.type} text={this.state.response.text}/>
          </div>
        </div>
      </Dash>
    );
  }
}