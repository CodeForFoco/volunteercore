import React, { Component } from 'react';
import search from '../../services/search';
import deleteMe from '../../services/delete';
import SearchBar from '../SearchBar/SearchBar';
import Alert from '../Alert/Alert';
import DashListItem from '../DashListItem/DashListItem';

export default class DashSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResult: {},
      searchError: {},
      search: ''
    };
  }

  search(e) {
    if (e) e.preventDefault();
    const { endpoint, token } = this.props;
    search.get(this.state.search, endpoint, token)
      .then(res => {
        this.setState({ searchResult: res.data });
      })
      .catch(err => {
        this.setState({ searchError: {
          type: 'alert-danger',
          text: err.response.statusText
        }});
      });
  }

  deleteItem(id, i) {
    const { endpoint, token } = this.props;
    deleteMe.deleteMe(id, endpoint, token)
      .then(res => {
        let searchResult = this.state.searchResult;
        searchResult.items.splice(i, 1);
        this.setState({ searchResult });
      })
      .catch(err => {
        this.setState({ searchError: {
          type: 'alert-danger',
          text: err.response.statusText
        }})
      });
  }

  componentDidMount() {
    this.search();
  }

  render () {
    const { title, endpoint, meta } = this.props;
    const items = this.state.searchResult.items;

    return (
      <div>
        <h3>Search {title || endpoint}</h3>
        <SearchBar
          title={title}
          endpoint={endpoint}
          value={this.state.search}
          setVal={(obj) => { this.setState(obj)}}
          submitSearch={this.search.bind(this)}
          addBtn={true}
        />
        <br/>
        <Alert {...this.state.searchError}/>
        <ul className="list-group">
          {items && items.length > 0 ? items.map((data, i) => {
            return (
              <DashListItem
                key={"dash-list-item-" + i}
                {...data}
                text={meta ? meta.text(data) : data.name || data.username}
                endpoint={endpoint}
                deleteItem={() => { this.deleteItem(data.id, i); }}
              />
            );
          }) : <p className="text-danger">None Found.</p>}
        </ul>
      </div>
    );
  }
}