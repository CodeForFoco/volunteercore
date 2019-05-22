import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './SearchBar.scss';

export default class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: '',
    };
  }

  submitSearch(e) {
    e.preventDefault();
    const { search } = this.state;

    axios.get(`/api/${this.props.endpoint}?search=${search}`)
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
    const upper = this.props.endpoint ? this.props.endpoint[0].toUpperCase() + this.props.endpoint.substr(1) : '';
    const title = this.props.title;

    return (
      <form onSubmit={this.submitSearch.bind(this)}>
        <label>Search {title || upper}</label>
        <div className="input-group">
          <input
            className="form-control"
            name="search"
            placeholder={`Search ${title || upper}`}
            onChange={this.setByName.bind(this)}
            value={this.state.search}
          />
          <div className="input-group-append">
            <input className="btn btn-primary" type="submit" value="Search"/>
            {this.props.endpoint && this.props.addBtn ? (
              <Link className="btn btn-info add-btn" to={`/dashboard/${this.props.endpoint}/add`}>
                Add {this.props.endpoint}
              </Link>
            ): ''}
          </div>
        </div>
      </form>
    );
  }
}