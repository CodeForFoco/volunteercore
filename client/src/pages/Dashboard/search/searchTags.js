import React, { Component } from 'react';
import DashWrap from '../../../components/DashWrap/DashWrap';
import DashSearch from '../../../components/DashSearch/DashSearch';

export default class SearchOpportunities extends Component {
  render () {
    return (
      <DashWrap {...this.props}>
        <DashSearch
          {...this.props}
          title="Tags"
          endpoint="tag_categories"
          meta={{
            text(data) {
              return `${data.category_name[0].toUpperCase() + data.category_name.substr(1)} | ${data.tags.length} Tags`;
            }
          }}
        />
      </DashWrap>
    );
  }
}