import React, { Component } from 'react';
import Thumb from '../../components/OpportunityThumb/OpportunityThumb.js';

export default class Opportunties extends Component {
  render () {
    return (
      <>
        <h1>Opportunities</h1>
        <form>
          <div class="form-group">
            <label for="exampleInputEmail1">Search Opportunities</label>
            <input type="text" class="form-control" placeholder="Search Opportunities"/>
            <br/><br/>
            <Thumb/>
            <Thumb/>
            <Thumb/>
            <Thumb/>
            <Thumb/>
            <Thumb/>
            <Thumb/>
            <Thumb/>
          </div>
        </form>
      </>
    );
  }
}