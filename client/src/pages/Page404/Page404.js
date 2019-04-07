import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Page404 extends Component {
  render () {
    return (
      <div>
        <h1>404 Page not found. :(</h1>
        <Link to="/"><b>Click here</b></Link> to go home.
      </div>
    );
  }
}