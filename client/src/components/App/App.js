import React, { Component } from 'react';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import history from '../../utils/history';
import ROUTES from './routes.js';
import axios from 'axios';
import LoadingPage from '../../pages/Loading/Loading';
import './App.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      token: '',
      loading: true
    }
  }

  set(obj, cb) {
    this.setState(obj, cb);
  }

  componentDidMount() {
    console.log('Mounted App.');
    console.log(JSON.stringify(this.state));
    const token = window.localStorage.getItem('token');
    if (token && token !== 'undefined') {
      axios.get('/api/users/authenticated_user', { headers: {
        Authorization: 'Bearer ' + token }})
        .then(res => {
          this.setState({ token, user: res.data, loading: false });
        })
        .catch(err => {
          this.setState({ loading: false });
        });
    } else {
      this.setState({ loading: false });
    }
  }

  render() {
    return (
      <Router history={history}>
        <Switch>
          {ROUTES.map((route) => {
            const C = route.component;
            route.component = (props) => {
              const { loading, user, token } = this.state;
              if (loading) {
                return <LoadingPage/>;
              }
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
