import React, { Component } from 'react';
import Thumb from '../../components/OppThumb/OppThumb.js';
import helper from '../../utils/helpers.js';
import './Opportunity.scss';

export default class Opportunties extends Component {
  constructor(props) {
    super(props);

    this.state = {
      popup: false
    }
  }

  componentDidMount() {
    helper.getOpportunities((res, err) => {
      if (err) { return alert(err); }
      this.props.set({ opportunities: res.data });
    });
  }

  render () {
    const validOpportunities = this.props.opportunities && this.props.opportunities.items ? true: false;

    return (
      <>
        <h1>Opportunities</h1>
        <form>
          <label>Search Partners</label>
          <div className="input-group">
            <input type="text" className="form-control" placeholder="Search Partners"/>
            <div className="input-group-append">
              <button className="btn btn-primary">Search</button>
            </div>
          </div><br/><br/>
            {validOpportunities ? this.props.opportunities.items.map((val) => {
             return <Thumb {...val}/>;
            }): ''}
        </form>
      </>
    );
  }
}