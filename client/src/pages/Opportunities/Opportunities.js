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
        this.setState({ searchError: err });
      });
  }

  render () {
    const items = this.state.searchResult ? this.state.searchResult.items : [];

    return (
      <Wrap>
        <h2>Search Opportunities</h2>
        <SearchBar
          endpoint='opportunities'
          set={this.set.bind(this)}
        />
        <Alert {...this.state.searchError}/>
        <br/><br/>
        {items ? items.map((val) => {
          return <Thumb {...val}/>;
        }): ''}
      </Wrap>
    );
  }
}