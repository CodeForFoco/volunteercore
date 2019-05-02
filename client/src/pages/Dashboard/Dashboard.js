import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Nav from '../../components/Nav/Nav.js';
import Footer from '../../components/Footer/Footer.js';
import SearchBar from '../../components/SearchBar/SearchBar.js';
import DashItem from '../../components/DashListItem/DashListItem.js';
import './Dashboard.scss';

import PAGES from './PAGES.js';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: PAGES[0],
      searchResult: {},
      searchError: {}
    };
  }

  deleteDoc(id, i) {
    axios.delete(`/api/${this.state.page.name}/${id}`)
      .then(res => {
        let searchResult = this.state.searchResult;
        searchResult.items.splice(i, 1);
        this.setState({ searchResult });
      })
      .catch(err => {
        alert(err);
      });
  }

  set(obj) {
    this.setState(obj);
  }

  defaultSearch() {
    axios.get('/api/' + this.state.page.name)
      .then(res => {
        this.setState({ searchResult: res.data });
      })
      .catch(err => {
        alert(err);
      });
  }

  setPage(index) {
    if (index !== this.state.pageIndex) {
      this.setState( {
        page: PAGES[index],
        searchResult: {},
        searchError: {},
        searchPageNum: 0,
        searchResultCount: 10
      }, this.defaultSearch);
    }
  }

  componentDidMount() {
    this.defaultSearch();
  }

  render () {
    return (
      <>
        <Nav/>
        <div className="dash">
          <Sidebar 
            pages={PAGES}
            setPage={this.setPage.bind(this)}
          />
          <Content
            {...this.state}
            set={this.set.bind(this)}
            deleteDoc={this.deleteDoc.bind(this)}
          />
        </div>
        <Footer/>
      </>
    );
  }
}

class Sidebar extends Component {
  render () {
    return (
      <div className="dash-side-bar">
        <h4 className="text-center">Dashboard</h4>
        <br/>
        <div className="dash-side-bar-items">
          {this.props.pages ? this.props.pages.map((page, index) => {
            return (
              <button 
                className="btn btn-block text-left btn-secondary"
                onClick={() => { this.props.setPage(index)}}>
                {page.name}
              </button>
            );
          }): ''}
          <button className="btn btn-block text-left btn-secondary" disabled>Settings</button>
          <button className="btn btn-block text-left btn-secondary" disabled>Help</button>
        </div>
      </div>
    );
  }
}

class Content extends Component {
  render () {
    const items = this.props.searchResult ? this.props.searchResult.items : [];

    return (
      <div className="dash-content">
        <h3>{this.props.name}</h3>
        <SearchBar
          name={this.props.page.name}
          addLinkName={this.props.page.addLinkName}
          addLink={this.props.page.addLink}
          url={`/api/${this.props.page.name}`}
          set={this.props.set.bind(this)}
        />
        <br/>
        <ul className="list-group">
          {/* Needs to be re-factored per page. Built-in Component for PAGES? */}
          {items ? items.map(({ name, partner_name, id }, i) => {
            return (
              <li className="list-group-item d-flex justify-content-between align-items-center">
                {name} - {partner_name}
                <div>
                  <Link className="btn btn-info btn-sm" to={`/${this.props.page.name}/${id}`}>View</Link>
                  <Link className="btn btn-warning btn-sm" to={`${this.props.page.editLink}/${id}`}>Edit</Link>
                  <Link 
                    className="btn btn-danger btn-sm"
                    onClick={() => {this.props.deleteDoc(id, i)}}>
                    Delete
                  </Link>
                </div>
              </li>
            );
          }) : 'Loading...'}
        </ul>
      </div>
    );
  }
}