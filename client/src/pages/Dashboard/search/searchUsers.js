import React, { Component } from 'react';
import DashWrap from '../../../components/DashWrap/DashWrap';
import DashSearch from '../../../components/DashSearch/DashSearch';

export default class SearchOpportunities extends Component {
  render () {
    return (
      <DashWrap {...this.props}>
        <DashSearch
          {...this.props}
          title="Users"
          endpoint="users"
          meta={{
            text(data) {
              data.username = data.username[0].toUpperCase() + data.username.substr(1);
              return `${data.roles.indexOf('Admin') !== -1 ? 'Admin' : 'User'} | ${data.username}`;
            }
          }}
        />
      </DashWrap>
    );
  }
}