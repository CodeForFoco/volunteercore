import React, { Component } from 'react';
import Wrap from '../../components/Wrap/Wrap.js';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class Opportunity extends Component {
  constructor(props) {
    super(props);

    this.state = {
      opportunity: {}
    }
  }

  componentDidMount() {
    axios.get('/api/opportunities/' + this.props.match.params.id)
      .then(res => {
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
            <h2><u>{opp.name}</u> - {opp.partner_name}</h2>
            {opp ? Object.keys(opp).map(key => {
              if (!opp[key]) return '';
              switch(key) {
                case 'id': return '';
                case 'partner_string': return '';
              }
              return <p><b>{key}:</b> {opp[key]}</p>;
            }): ''}
          </div>
        </div>
      </Wrap>
    );
  }
}
