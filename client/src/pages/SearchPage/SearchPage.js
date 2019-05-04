import React, { Component } from 'react';
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

  set(obj) {
    this.setState(obj);
  }

  componentDidMount() {
    const endpoint = this.props.match.params.endpoint || 'opportunities';
    axios.get(`/api/${endpoint}`)
      .then(res => {
        this.setState({ searchResult: res.data, searchError: {} });
      })
      .catch(err => {
        this.setState({ searchError: err });
      });
  }

  componentDidUpdate() {
    const endpoint = this.props.match.params.endpoint || 'opportunities';
    axios.get(`/api/${endpoint}`)
      .then(res => {
        this.setState({ searchResult: res.data, searchError: {} });
      })
      .catch(err => {
        this.setState({ searchError: err });
      });
  }

  render () {
    const items = this.state.searchResult.items || [];
    const endpoint = this.props.match.params.endpoint || 'opportunities';
    const meta = endpoints[this.props.match.params.endpoint];

    return (
      <Dash>
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
                text={meta ? meta.text(data) : data.name || data.username}
                endpoint={endpoint}
              />
            );
          }) : ''}
        </ul>
      </Dash>
    );
  }
}