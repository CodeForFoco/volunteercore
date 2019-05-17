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

  disableFields(myRows) {
    let rows = JSON.parse(JSON.stringify(myRows));
    return rows.map(row => {
      return row.map(item => {
        item.disabled = true;
        return item;
      })
    })
  }

  formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }

  componentDidMount() {
    const { endpoint, id } = this.props.match.params;
    axios.get(`/api/${endpoint}/${id}`, { headers: {
      Authorization: 'Bearer ' + this.props.token
    }})
      .then(res => {
        let d = new Date(res.data.start_date);
        res.data.start_date = this.formatDate(res.data.start_date);
        res.data.end_date = this.formatDate(res.data.end_date);
        console.log(res.data);
        this.setState({ searchResult: res.data });
      })
      .catch(err => {
        this.setState({ searchError: err });
      });
  }

  render () {
    const endpoint = this.props.match.params.endpoint;
    return (
      <Dash {...this.props}>
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