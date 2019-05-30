import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import ROUTES from './routes.js';
import axios from 'axios';
import Page404 from '../../pages/Page404/Page404';
import './App.scss';


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
              const { user, token } = this.state;
              if (route.admin) {
                if (!user || !user.roles || user.roles.indexOf('Admin') === -1) {
                  return <Redirect to="/"/>;
                }
              }
              if (route.token) {
                if (!token || !user || !user.roles) {
                  return <Redirect to="/"/>
                }
              }
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
