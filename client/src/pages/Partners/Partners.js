import React, { Component } from 'react';
import './Partners.scss';
import axios from 'axios';

export default class Partners extends Component {
  constructor(props) {
    super(props);

    this.state = {
      partners: {}
    }
  }

  componentDidMount() {
    axios.get('/api/partners')
      .then(res => {
        this.setState({ partners: res.data});
      })
      .catch(err => {
        alert(err);
      });
  }

  render () {
    const items = this.state.partners ? this.state.partners.items : '';

    return (
      <>
        <h1>Partners</h1>
        <form>
          <label>Search Partners</label>
          <div className="input-group">
            <input type="text" className="form-control" placeholder="Search Partners"/>
            <div className="input-group-append">
              <button className="btn btn-primary">Search</button>
            </div>
          </div>
        </form>
        <br/><br/>
          {items ? items.map(({ name, opportunity_count }) => {
            return (
              <div>
                <h4><u>{name}</u></h4>
                <p>{opportunity_count} opportunities</p>
                <div>
                  <span className='badge badge-pill badge-primary'> Children </span>
                  <span className='badge badge-pill badge-primary'> Art </span>
                  <span className='badge badge-pill badge-primary'> Teaching </span>
                  <span className='badge badge-pill badge-primary'> Cooking </span>       
                </div>
                <br/>
              </div>
            );
          }) : ''}
      </>
    );
  }
}