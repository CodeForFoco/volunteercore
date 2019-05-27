import React, { Component } from 'react';
import Wrap from '../../components/Wrap/Wrap.js';
import Thumb from '../../components/OppThumb/OppThumb.js';
import SearchBar from '../../components/SearchBar/SearchBar.js';
import Alert from '../../components/Alert/Alert.js';
import './Opportunity.scss';
import axios from 'axios';

export default class Opportunties extends Component {
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
    axios.get(`/api/opportunities?search=${search}&page=${page}&per_page=${per_page}`, { headers: { Authorization: 'Bearer ' + this.props.token }})
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

  hasNextPage() {
    let nextPage = this.state.page + 1;
    const { searchResult } = this.state;
    if (searchResult && searchResult._meta && searchResult._meta.total_pages) {
      if (nextPage <= searchResult._meta.total_pages) {
        return true;
      }
    }
  }

  hasLastPage() {
    const lastPage = this.state.page - 1;
    if (lastPage > 0) {
      return true;
    }
  }

  nextPage() {
    const nextPage = this.state.page + 1;
    if (this.hasNextPage()) {
      this.setState({ page: nextPage}, this.search);
    }
  }

  lastPage() {
    const lastPage = this.state.page - 1;
    if (this.hasLastPage()) {
      this.setState({ page: lastPage }, this.search);
    }
  }

  set(obj) {
    this.setState(obj);
  }

  componentDidMount() {
    this.search();
  }

  render () {
    const items = this.state.searchResult ? this.state.searchResult.items : [];

    return (
      <Wrap {...this.props}>
        <h2>Search Opportunities</h2>
        <SearchBar
          endpoint='opportunities'
          setValue={this.set.bind(this)}
          search={this.state.search}
          submitSearch={this.search.bind(this)}
        />
        <Alert {...this.state.searchError}/>
        <br/><br/>
        {items && items.length > 0 ? items.map((val) => {
          return <Thumb {...val}/>;
        }): <p className="text-danger">No Opportunities found.</p>}
        <nav className="text-center row justify-content-center">
          <ul className="pagination">
            <li className="page-item">
              <button className={`btn btn-${this.hasLastPage() ? 'info': 'primary'}`} disabled={!this.hasLastPage()} onClick={this.lastPage.bind(this)}>
                <span aria-hidden="true">&laquo; </span>
                <span className=""> Last</span>
              </button>
            </li>
            <li className="page-item">
              <button className="btn btn-info" disabled>{this.state.page}</button>
            </li>
            <li className="page-item">
              <button className={`btn btn-${this.hasNextPage() ? 'info': 'primary'}`} disabled={!this.hasNextPage()} onClick={this.nextPage.bind(this)}>
                <span>Next </span>
                <span aria-hidden="true">&raquo;</span>
              </button>
            </li>
          </ul>
        </nav>
      </Wrap>
    );
  }
}