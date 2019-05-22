import React, { Component } from 'react';
import DashWrap from '../../../components/DashWrap/DashWrap';
import DashSearch from '../../../components/DashSearch/DashSearch';

export default class SearchOpportunities extends Component {
  render () {
    return (
      <DashWrap {...this.props}>
        <DashSearch
          {...this.props}
          title="Opportunities"
          endpoint="opportunities"
          meta={{
            text(data) {
              return `${data.partner_name} | ${data.name}`;
            }
          }}
        />
      </DashWrap>
    );
  }
}