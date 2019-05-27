import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ROUTES from './routes.js';
import './App.scss';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      token: ''
    }
  }

  set(obj, cb) {
    this.setState(obj, cb);
  }

  componentDidMount() {
    const token = window.localStorage.getItem('token');
    if (token && token !== 'undefined') {
      axios.get('/api/users/authenticated_user', { headers: {
        Authorization: 'Bearer ' + token }})
        .then(res => {
          console.log(res.data);
          this.setState({ token, user: res.data });
        });
    }
  }

  render() {
    return (
      <Router>
        <Switch>
          {ROUTES.map((route) => {
            const C = route.component;
            route.component = (props) => {
              return <C set={this.set.bind(this)} {...this.state} {...props}/>
            };
            return (<Route exact {...route} key={'r-' + route.path}/>);
          })}
        </Switch>
      </Router>
    );
  }
}

export default App;
