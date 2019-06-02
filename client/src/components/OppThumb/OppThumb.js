import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './OppThumb.scss';

export default class OpportunityThumb extends Component {
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

  render () {
    const tags = this.flattenTags(this.props.tags);
    const { id, location_street, location_city, location_zip } = this.props;
    return (
      <div className="opp-thumb">
        <Link to={`/opportunities/view/${this.props.id}`}>
          <h4><u>{this.props.name}</u> - {this.props.partner_name}</h4>
        </Link>
        <span>{location_street || '? Street'}, {location_city || '? City'}, {location_zip || '? Zip'}</span>
        <br/>
        <span>
          {this.props.shift_hours || '?'} Hours -
          {' ' + (this.props.commitment_length_months || '?') + ' Months' }
          {this.props.volunteers_needed ? ' - ' + this.props.volunteers_needed + ' Volunteers Needed' : ''}
        </span>
        <div className="opp-thumb-tags">
          {tags.map(tag => {
            return <span className='badge badge-dark' key={'tag-' + tag}>{ tag }</span>
          })}
        </div>
        <div className="btn-group">
          <Link className="btn btn-info btn-sm" to={`/opportunities/view/${id}`}>View</Link>
          <Link className="btn btn-warning btn-sm" to={`/opportunities/edit/${id}`}>Edit</Link>
          <button className="btn btn-danger btn-sm" onClick={this.props.deleteOne.bind(this)}>Delete</button>
        </div>
      </div>
    );
  }
}
