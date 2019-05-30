import React, { Component } from 'react';
import Wrap from '../../components/Wrap/Wrap';

export default class DashHelp extends Component {
  render () {
    return (
      <Wrap {...this.props}>
        <h1>Need Help?</h1>
        <p>Common issues:</p>
        <ul>
          <li>
            <p><b>Reset a password</b></p>
            <p>Contact your site administrator.</p>
          </li>
          <li>
            <p><b>Create an account</b></p>
            <p>Contact your site administrator.</p>
          </li>
          <li>
            <p><b>Submit an issue</b></p>
            <p>To submit an issue, <a href="https://github.com/CodeForFoco/volunteercore/issues/new" rel="noopener noreferrer">follow this link</a>.</p>
          </li>
          <li>
            <p><b>Request a feature</b></p>
            <p>To request a feature, <a href="https://github.com/CodeForFoco/volunteercore/issues/new" rel="noopener noreferrer">follow this link</a>.</p>
          </li>
          <li>
            <p><b>Other Issues</b></p>
            <p>For any other issues, contact your site administrator or submit an issue as described above.</p>
          </li>
        </ul>
        <br/>
        <p>Volunteer Core is maintained by <a href="http://codeforfoco.org/">Code For Fort Collins</a>.</p>
      </Wrap>
    );
  }
}