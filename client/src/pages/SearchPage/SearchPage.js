import React, { Component } from 'react';
import Alert from '../../components/Alert/Alert.js';
import Dash from '../../components/Dashboard/Dashboard.js';
import SearchBar from '../../components/SearchBar/SearchBar.js';
import DashListItem from '../../components/DashListItem/DashListItem.js';
import Pagination from '../../components/Pagination/Pagination';
import endpoints from '../../utils/endpoints.js';
import axios from 'axios';

export default class SearchPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResult: {},
      searchError: {},
      page: 1,
      per_page: 10,
      search: '',
    };
  }

  search(e) {
    if (e && e.preventDefault) e.preventDefault();
    const endpoint = this.props.match.params.endpoint;
    const { search, page, per_page } = this.state;
    axios.get(`/api/${endpoint}?search=${search}&page=${page}&per_page=${per_page}`)
    .then(res => {
      this.setState({ searchResult: res.data });
    })
    .catch(err => {
      this.setState({ searchError: {
        text: err.response.status + ' ' + err.response.statusText,
        type: 'alert-danger'
      }});
    });
  }

  deleteItem(id, i) {
    axios.delete(`/api/${this.props.match.params.endpoint}/${id}`, { headers: {
        Authorization: 'Bearer ' + this.props.token
      }})
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

  componentDidMount() {
    this.search();
  }

  componentWillReceiveProps(props) {
    if (props.match.params.endpoint !== this.props.match.params.endpoint) {
      this.setState({ searchResult: {}, searchError: {}, search: ''}, this.search);
    }
  }

  render () {
    const items = this.state.searchResult.items || [];
    const endpoint = this.props.match.params.endpoint;
    const meta = endpoints[this.props.match.params.endpoint];

    return (
      <Dash {...this.props}>
        <h3>{`Search ${endpoints[endpoint] ? endpoints[endpoint].title : endpoint}`}</h3>
        <SearchBar
          title={endpoints[endpoint] ? endpoints[endpoint].title : ''}
          endpoint={endpoint}
          setValue={this.set.bind(this)}
          search={this.state.search}
          submitSearch={this.search.bind(this)}
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
        <br/>
        <Pagination
          {...this.state}
        />
      </Dash>
    );
  }
}