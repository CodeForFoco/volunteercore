import React, { Component } from 'react';
import Wrap from '../../../components/Wrap/Wrap.js';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class ViewOpportunity extends Component {
  constructor(props) {
    super(props);

    this.state = {
      opportunity: {}
    }
  }

  // {categoryB: [b], categoryA: [a] } => [a, b]
  flattenTags(categories) {
    if (!categories || Array.isArray(categories)) return [];
    let tags = [];
    Object.keys(categories).forEach(key => {
      categories[key].forEach(tag => {
        tags.push(tag);
      });
    });
    return tags;
  }

  componentDidMount() {
    axios.get('/api/opportunities/' + this.props.match.params.id)
      .then(res => {
        if (res.data.tags) {
          res.data.tags = this.flattenTags(res.data.tags);
        }
        this.setState({ opportunity: res.data });
      })
      .catch(err => {
        alert(err);
      });
  }

  render () {
    const opp = this.state.opportunity;
    return (
      <Wrap {...this.props}>
        <h1>{opp.partner_name || 'Loading...'}</h1>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/opportunities" className="text-info">Opportunities</Link></li>
            <li className="breadcrumb-item">{opp.partner_name || 'Loading...'}</li>
          </ol>
        </nav>
        <div className="card">
          <div className="card-header">
            Volunteer for {opp.partner_name || 'Loading...'}
          </div>
          <div className="card-body">
            <h3><u>{opp.name}</u> - {opp.partner_name}</h3>
            {opp ? Object.keys(opp).map(key => {
              if (!opp[key]) return '';
              switch(key) {
                case 'id': return '';
                case 'partner_string': return '';
              }
              return <p><b>{key}:</b> {JSON.stringify(opp[key])}</p>;
            }): ''}
          </div>
        </div>
      </Wrap>
    );
  }
}
