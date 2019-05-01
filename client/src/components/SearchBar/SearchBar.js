import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
    const upper = this.props.name ? this.props.name[0].toUpperCase() + this.props.name.substr(1) : '';

    return (
      <form onSubmit={this.submitSearch.bind(this)}>
        <label>Search {upper}</label>
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
            {this.props.addLink ?
              <Link 
                className="btn btn-info" 
                to={'/dashboard/add' + this.props.addLink}>
                  Add {this.props.addLink}
              </Link>
            : ''}
          </div>
        </div>
      </form>
    );
  }
}