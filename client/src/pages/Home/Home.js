import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Wrap from '../../components/Wrap/Wrap.js';

export default class Home extends Component {
  render () {
    return (
      <Wrap>
        <div className="jumbotron">
          <h1 className="display-3">Welcome!</h1>
          <p className="lead">Welcome to Volunteer Force. Start volunteering today!</p>
          <hr className="my-4"/>
          <p>Click to find opportunities!</p>
          <p className="lead">
            <Link className="btn btn-primary btn-lg" to="/opportunities" role="button">Search Opportunites</Link>
          </p>
        </div>
      </Wrap>
    );
  }
}