import React, { Component } from 'react';
import './OpportunityThumb.scss';

export default class OpportunityThumb extends Component {
  render () {
    return (
      <div className='opportunity-thumb'>
        <h4><u>Prepare Shipments</u> - Volunteers of America</h4>
        <p>405 Canyon Avenue Fort Collins, CO, 80521</p>
        <p>1 Hour - Daily - 2019.01.01 - 2019.09.07</p>
        <div>
          <span className='badge badge-pill badge-primary'> Children </span>
          <span className='badge badge-pill badge-primary'> Art </span>
          <span className='badge badge-pill badge-primary'> Teaching </span>
          <span className='badge badge-pill badge-primary'> Cooking </span>       
        </div>
      </div>
    );
  }
}