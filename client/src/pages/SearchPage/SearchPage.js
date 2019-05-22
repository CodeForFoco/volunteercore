import React, { Component } from 'react';
import Alert from '../../components/Alert/Alert.js';
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
        this.setState({ searchError: {
          text: err.response.status + ' ' + err.response.statusText,
          type: 'alert-danger'
        }});
      });
  }

  set(obj) {
    this.setState(obj);
  }

  defaultSearch() {
    axios.get(`/api/${this.props.match.params.endpoint}`, {
      headers: {
        Authorization: 'Bearer ' + this.props.token
      }
    })
      .then(res => {
        this.setState({ searchResult: res.data, searchError: {} });
      })
      .catch(err => {
        this.setState({ searchError: {
          text: err.response.status + ' ' + err.response.statusText,
          type: 'alert-danger'
        }});
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
        <Alert {...this.state.searchError}/>
        <ul className="list-group">
          {items && items.length > 0 ? items.map((data, i) => {
            return (
              <DashListItem
                key={"dash-list-item-" + i}
                {...data}
                text={meta ? meta.text(data) : data.name || data.username}
                endpoint={endpoint}
                deleteItem={() => { this.deleteItem(data.id, i); }}
              />
            );
          }) : <p className="text-danger">None Found.</p>}
        </ul>
      </Dash>
    );
  }
}