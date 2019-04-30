import React, { Component } from 'react';
import './Footer.scss';

export default class Footer extends Component {
  render () {
    return (
      <footer className="row">
        <div className="col text-center">
          Website created  with love by the <a href="http://codeforfoco.org/" rel="noreferrer noopener" target="_blank">Code For Fort Collins</a> crew.
        </div>
      </footer>
    );
  }
}