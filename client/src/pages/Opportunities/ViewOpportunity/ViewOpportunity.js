import React, { Component } from 'react';
import Wrap from '../../../components/Wrap/Wrap.js';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './ViewOpportunity.scss';

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
    const token = this.props.token;
    axios.get('/api/opportunities/' + this.props.match.params.id, { headers: { Authorization: 'Bearer ' + token}})
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
            <h2>{opp.name}</h2>
            <h5>Code For Foco</h5>
            <span>{opp.location_street || '? Street'}, {opp.location_city || '? City'}, {opp.location_zip || '? Zip'}</span>
            <br/>
            <span>
              {opp.shift_hours ? opp.shift_hours + ' Hours' : ''}
              {opp.commitment_length_months ? ` | ${opp.commitment_length_months} Months` : ''}
              {opp.volunteers_needed ? ' | ' + opp.volunteers_needed + ' Volunteers Needed' : ''}
            </span>
            <div className="opp-thumb-tags">
              {opp.tags? opp.tags.map(tag => {
                return <span className='badge badge-dark'>{ tag }</span>
              }): ''}
            </div>
            <br/>
            <p>{opp.description || 'No Description'}</p>
            <span className="view-opp-bold">
              {`${new Date(opp.start_date).toDateString()} to ${new Date(opp.end_date).toDateString()}`}
            </span>
            <br/>
            <span className="view-opp-bold">
                {`${opp.frequency_unit} ${opp.frequency_modifier}`}
            </span>
          </div>
        </div>
      </Wrap>
    );
  }
}
