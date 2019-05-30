import React, { Component } from 'react';
import Wrap from '../../components/Wrap/Wrap.js';
import SearchBar from '../../components/SearchBar/SearchBar.js';
import PartnerThumb from '../../components/PartnerThumb/PartnerThumb';
import './Partners.scss';
import axios from 'axios';
import Alert from '../../components/Alert/Alert';
import Pagination from '../../components/Pagination/Pagination';

export default class Partners extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResult: {},
      searchError: {},
      page: 1,
      per_page: 10,
      search: '',
    }
  }

  search() {
    const { search, page, per_page } = this.state;
    axios.get(`/api/partners?search=${search}&page=${page}&per_page=${per_page}`, { headers: { Authorization: 'Bearer ' + this.props.token }})
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

  setValue(obj, cb) {
    this.setState(obj, cb);
  }

  deleteOne(index) {
    const token = this.props.token;
    let searchResult = this.state.searchResult;
    let id = searchResult.items[index].id;
    axios.delete(`/api/partners/${id}`, { headers: { Authorization: `Bearer ${token}`}})
      .then(res => {
        searchResult.items.splice(index, 1);
        this.setState({ searchResult });
      })
      .catch(err => {
        alert('Delete Failed. Please try again.');
      });
  }

  componentDidMount() {
    this.search();
  }

  render () {
    const items = this.state.searchResult ? this.state.searchResult.items : [];

    return (
      <Wrap {...this.props}>
        <h2>Search Partners</h2>
        <SearchBar
          endpoint='partners'
          setValue={this.setValue.bind(this)}
          search={this.state.search}
          submitSearch={this.search.bind(this)}
          postUrl="/partners/post"
        />
        <Alert {...this.state.searchError}/>
        <br/><br/>
        {items && items.length > 0 ? items.map((val, i) => {
          return (
            <PartnerThumb
              {...val}
              deleteOne={() => { this.deleteOne(i); }}
            />
          );
        }) : <p className="text-danger">No Partners found.</p>}
        <Pagination
          {...this.state}
          setValue={this.setValue.bind(this)}
          search={this.search.bind(this)}
        />
      </Wrap>
    );
  }
}
