import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Dash from '../../components/Dashboard/Dashboard.js';
import Form from '../../objects/Form/Form.js';
import axios from 'axios';
import endpoints from '../../utils/endpoints.js';

export default class ViewPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResult: {},
      searchError: {}
    };
  }

  componentDidMount() {
    const { endpoint, id } = this.props.match.params;
    axios.get(`/api/${endpoint}/${id}`, {}, { headers: {
      Authorization: 'Bearer ' + this.props.token
    }})
      .then(res => {
        this.setState({ searchResult: res.data });
      })
      .catch(err => {
        this.setState({ searchError: err });
      });
  }

  disableFields(myRows) {
    let rows = JSON.parse(JSON.stringify(myRows));
    return rows.map(row => {
      return row.map(item => {
        item.disabled = true;
        return item;
      })
    })
  }

  render () {
    const endpoint = this.props.match.params.endpoint;
    return (
      <Dash>
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
              View {endpoint}
            </li>
          </ol>
        </nav>
        <div className="card">
          <div className="card-header">
            Thank you for using Volunteer Force!
          </div>
          <div className="card-body">
            <Form
              submitForm={() => {}}
              data={this.state.searchResult}
              rows={this.disableFields(endpoints[endpoint].rows)}
              set={() => {}}
              disableSubmit={true}
            />
          </div>
        </div>
      </Dash>
    );
  }
}