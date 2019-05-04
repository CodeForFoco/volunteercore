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
      endpoint: this.props.match.params.endpoint || 'opportunities',
      meta: endpoints[this.props.match.params.endpoint] || {},
      searchResult: {},
      searchError: {}
    };
  }

  set(obj) {
    this.setState(obj);
  }

  componentDidMount() {
    axios.get(`/api/${this.state.endpoint}`)
      .then(res => {
        this.setState({ searchResult: res.data, searchError: {} });
      })
      .catch(err => {
        this.setState({ searchError: err });
      });
  }

  render () {
    const items = this.state.searchResult.items || [];

    return (
      <Dash>
        <h3>Search {this.state.endpoint}</h3>
        <SearchBar
          endpoint={this.state.endpoint}
          set={this.set.bind(this)}
          addBtn={true}
        />
        <br/>
        <ul className="list-group">
          {items ? items.map((data, i) => {
            return (
              <DashListItem
                key={"dash-list-item-" + i}
                text={this.state.meta.text(data)}
                endpoint={this.state.endpoint}
              />
            );
          }) : ''}
        </ul>
      </Dash>
    );
  }
}