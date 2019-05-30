import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Wrap from '../../components/Wrap/Wrap.js';
import Form from '../../objects/Form/Form.js';
import Alert from '../../components/Alert/Alert.js';
import axios from 'axios';
import endpoints from '../../utils/endpoints.js';
import parse from '../../utils/parseFields.js';

export default class PostPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: endpoints.fieldsToState(this.props.endpoint),
      response: {}
    };
  }

  submitForm(e) {
    e.preventDefault();
    let { data } = this.state;
    const endpoint = this.props.endpoint;
    data = parse.parseData(data, this.props.endpoint);

    axios.put(`/api/${endpoint}/${data.id}`, data, {
      headers: {
        Authorization: 'Bearer ' + this.props.token
      }
    }).then(() => {
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

  setValue(obj) {
    let data = this.state.data;
    let key = Object.keys(obj)[0];
    data[key] = obj[key];
    this.setState({ data });
  }

  componentDidMount() {
    this._isMounted = true;
    axios.get(`/api/${this.props.endpoint}/${this.props.match.params.id}`, {
      headers: {
        Authorization: 'Bearer ' + this.props.token
      }})
      .then(res => {
        this.setState({ data: parse.formatData(res.data, this.props.endpoint) });
      })
      .catch(err => {
        this.setState({ response: err });
      })
  }

  render () {
    const endpoint = this.props.endpoint;
    return (
      <Wrap {...this.props}>
        <h3>Edit {endpoint}</h3>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link 
                className="text-info"
                to={`/${endpoint}`}>
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
            Thanks for using Volunteer Core!
          </div>
          <div className="card-body">
            <Form
              submitForm={this.submitForm.bind(this)}
              data={this.state.data}
              fields={endpoints[endpoint].fields}
              setValue={this.setValue.bind(this)}
              submitBtnClass='btn-warning'
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