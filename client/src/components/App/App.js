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

  componentWillMount() {
    const token = window.localStorage.getItem('token');
    if (token && token !== 'undefined') {
      this.setState({ token });
      axios.get('/api/users/1', { headers: {
        Authorization: 'Bearer ' + token
      }}).then(res => {
          let user = this.state.user;
          user.admin = true;
          this.setState({ user: { admin: true }});
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
