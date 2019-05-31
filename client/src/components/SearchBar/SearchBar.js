import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './SearchBar.scss';

export default class SearchBar extends Component {
  render () {
    const upper = this.props.endpoint ? this.props.endpoint[0].toUpperCase() + this.props.endpoint.substr(1) : '';
    const title = this.props.title;

    return (
      <form onSubmit={this.props.submitSearch.bind(this)}>
        <label>Search {title || upper}</label>
        <div className="input-group">
          <input
            className="form-control"
            name="search"
            placeholder={`Search ${title || upper}`}
            onChange={(e) => { this.props.setValue({ search: e.target.value }); }}
            value={this.props.search}
          />
          <div className="input-group-append">
            <input className="btn btn-primary" type="submit" value="Search"/>
            {this.props.endpoint && this.props.addBtn ? (
              <Link className="btn btn-info add-btn" to={`/dashboard/${this.props.endpoint}/add`}>
                Add {this.props.endpoint}
              </Link>
            ): this.props.postUrl ? (
              <Link className="btn btn-info add-btn" to={this.props.postUrl}>
                Add {this.props.endpoint}
              </Link>
            ) : ''}
          </div>
        </div>
      </form>
    );
  }
}