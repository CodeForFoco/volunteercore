import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Dash from '../../components/Dashboard/Dashboard.js';
import axios from 'axios';
import parser from '../../utils/parseFields.js';

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
    axios.get(`/api/${endpoint}/${id}`, { headers: {
      Authorization: 'Bearer ' + this.props.token
    }})
      .then(res => {
        this.setState({ searchResult: parser.formatData(res.data, this.props.match.params.endpoint) });
      })
      .catch(err => {
        this.setState({ searchError: err });
      });
  }

  render () {
    const endpoint = this.props.match.params.endpoint;
    const data = this.state.searchResult;

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
            Thank you for using Volunteer Core!
          </div>
          <div className="card-body">
            {Object.keys(data).map(key => {
              if (!data[key]) return '';
              return <p key={"view-page-" + key}><u>{key}</u> = {JSON.stringify(data[key])}</p>
            })}
          </div>
        </div>
      </Dash>
    );
  }
}