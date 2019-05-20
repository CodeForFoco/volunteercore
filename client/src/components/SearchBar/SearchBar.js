import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './SearchBar.scss';

export default class SearchBar extends Component {
  render () {
    return (
      <form onSubmit={this.props.submitSearch.bind(this)}>
        <label>Search {this.props.title || this.props.endpoint}</label>
        <div className="input-group">
          <input
            className="form-control"
            name="search"
            placeholder={`Search ${this.props.title}`}
            onChange={(e) => { this.props.setVal({ [e.target.name]: e.target.value }) }}
            value={this.props.search}
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