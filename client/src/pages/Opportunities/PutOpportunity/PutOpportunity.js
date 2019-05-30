import React, { Component } from 'react';
import PutForm from '../../../components/PutForm/PutForm';

export default class PutOpportunity extends Component {
  render () {
    return (
      <PutForm
        {...this.props}
        endpoint='opportunities'
      >
      </PutForm>
    );
  }
}