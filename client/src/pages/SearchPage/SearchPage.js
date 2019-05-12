import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Dash from '../../components/Dashboard/Dashboard.js';
import SearchBar from '../../components/SearchBar/SearchBar.js';
import DashListItem from '../../components/DashListItem/DashListItem.js';
import endpoints from '../../utils/endpoints.js';
import axios from 'axios';

export default class SearchPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResult: {},
      searchError: {}
    };
  }

  deleteItem(id, i) {
    axios.delete(`/api/${this.props.match.params.endpoint}/${id}`, {}, {
      headers: {
        Authorization: 'Bearer ' + this.props.token
      }
    })
      .then(() => {
        let searchResult = this.state.searchResult;
        searchResult.items.splice(i, 1);
        this.setState({ searchResult });
      })
      .catch(err => {
        this.setState({ searchError: err });
      });
  }

  set(obj) {
    this.setState(obj);
  }

  defaultSearch() {
    axios.get(`/api/${this.props.match.params.endpoint}`, {}, {
      headers: {
        Authorization: 'Bearer ' + this.props.token
      }
    })
      .then(res => {
        this.setState({ searchResult: res.data, searchError: {} });
      })
      .catch(err => {
        this.setState({ searchError: err });
      });
  }

  componentDidMount() {
    this.defaultSearch();
  }

  componentWillReceiveProps(props) {
    if (props.match.params.endpoint !== this.props.match.params.endpoint) {
      this.setState({ searchResult: {}, searchError: {}}, this.defaultSearch);
    }
  }

  render () {
    if (!this.props.token) {
      return <Redirect to="/"/>;
    }

    const items = this.state.searchResult.items || [];
    const endpoint = this.props.match.params.endpoint;
    const meta = endpoints[this.props.match.params.endpoint];

    return (
      <Dash {...this.props}>
        <h3>Search {endpoint}</h3>
        <SearchBar
          endpoint={endpoint}
          set={this.set.bind(this)}
          addBtn={true}
        />
        <br/>
        <ul className="list-group">
          {items ? items.map((data, i) => {
            return (
              <DashListItem
                key={"dash-list-item-" + i}
                {...data}
                text={meta ? meta.text(data) : data.name || data.username}
                endpoint={endpoint}
                deleteItem={() => { this.deleteItem(data.id, i); }}
              />
            );
          }) : ''}
        </ul>
      </Dash>
    );
  }
}