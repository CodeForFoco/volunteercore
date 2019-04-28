import React, { Component } from 'react';
import Thumb from '../../components/OppThumb/OppThumb.js';
import helper from '../../utils/helpers.js';
import './Opportunity.scss';
import axios from 'axios';

export default class Opportunties extends Component {
  constructor(props) {
    super(props);

    this.state = {
      popup: false,
      opportunities: {},
      search: ''
    }
  }

  submitSearch(e) {
    e.preventDefault();
    axios.get('/api/opportunities?search=' + this.state.search)
      .then(res => {
        this.setState({ opportunities: res.data });
      })
      .catch(err => {
        alert(err);
      })
  }

  updateSearch(e) {
    this.setState({ search: e.target.value });
  }

  componentDidMount() {
    axios.get('/api/opportunities')
      .then(res => {
        this.setState({ opportunities: res.data });
      })
      .catch(err => {
        alert(err);
      });
  }

  componentDidUpdate(prevProps, prevState) {
    Object.entries(this.props).forEach(([key, val]) =>
    prevProps[key] !== val && console.log(`Prop '${key}' changed`)
    );
    Object.entries(this.state).forEach(([key, val]) =>
      prevState[key] !== val && console.log(`State '${key}' changed`)
    );
  }

  render () {
    const items = this.state.opportunities ? this.state.opportunities.items : [];

    return (
      <>
        <h1>Opportunities</h1>
        <form onSubmit={this.submitSearch.bind(this)}>
          <label>Search Opportunities</label>
          <div className="input-group">
            <input
              autoComplete={'null'}
              className="form-control"
              name="search"
              onChange={this.updateSearch.bind(this)}
              placeholder="Search Opportunities"
              value={this.state.search}
            />
            <div className="input-group-append">
              <input className="btn btn-primary" type="submit" value="search"/>
            </div>
          </div>
        </form>
        <br/><br/>
        {items ? items.map((val) => {
          return <Thumb {...val}/>;
        }): ''}
      </>
    );
  }
}