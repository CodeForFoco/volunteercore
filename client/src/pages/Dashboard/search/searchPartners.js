import React, { Component } from 'react';
import DashWrap from '../../../components/DashWrap/DashWrap';
import DashSearch from '../../../components/DashSearch/DashSearch';

export default class SearchOpportunities extends Component {
  render () {
    return (
      <DashWrap {...this.props}>
        <DashSearch
          {...this.props}
          title="Partners"
          endpoint="partners"
          meta={{
            text(data) {
              return `${data.name} | ${data.opportunity_count} Opps`;
            }
          }}
        />
      </DashWrap>
    );
  }
}