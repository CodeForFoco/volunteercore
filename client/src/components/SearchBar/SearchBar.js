import React, { Component } from 'react';
import axios from 'axios';

export default class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: '',
      url: this.props.url,
    };
  }

  submitSearch(e) {
    e.preventDefault();
    const { search, url } = this.state;

    axios.get(`${url}?search=${search}`)
      .then(res => {
        this.props.set({ searchResult: res.data });
      })
      .catch(err => {
        this.props.set({ searchError: {
          text: err.response.data.message,
          type: 'alert-danger'
        }});
      })
  }

  setByName(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render () {
    return (
      <form onSubmit={this.submitSearch.bind(this)}>
        <label>Search Opportunities</label>
        <div className="input-group">
          <input
            className="form-control"
            name="search"
            placeholder="Search Opportunities"
            onChange={this.setByName.bind(this)}
            value={this.state.search}
          />
          <div className="input-group-append">
            <input className="btn btn-primary" type="submit" value="Search"/>
          </div>
        </div>
      </form>
    );
  }
}