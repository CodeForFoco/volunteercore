import React, { Component } from 'react';
import Thumb from '../../components/OppThumb/OppThumb.js';
import SearchBar from '../../components/SearchBar/SearchBar.js';
import Alert from '../../components/Alert/Alert.js';
import './Opportunity.scss';
import axios from 'axios';

export default class Opportunties extends Component {
  constructor(props) {
    super(props);

    this.state = {
      popup: false,
      searchResult: {},
      searchError: {}
    }
  }

  set(obj) {
    this.setState(obj);
  }

  componentDidMount() {
    axios.get('/api/opportunities')
      .then(res => {
        this.setState({ searchResult: res.data });
      })
      .catch(err => {
        alert(err);
      });
  }

  render () {
    const items = this.state.searchResult ? this.state.searchResult.items : [];

    return (
      <>
        <h1>Opportunities</h1>
        <SearchBar
          name="opportunities"
          url="/api/opportunities"
          set={this.set.bind(this)}
        />
        <Alert {...this.state.searchError}/>
        <br/><br/>
        {items ? items.map((val) => {
          return <Thumb {...val}/>;
        }): ''}
      </>
    );
  }
}