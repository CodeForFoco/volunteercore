import React, { Component } from 'react';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import history from '../../utils/history';
import { isAdmin, isUser } from '../../utils/validation.js';
import ROUTES from './routes.js';
import axios from 'axios';
import LoadingPage from '../../pages/Loading/Loading';
import './App.scss';

class App extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      loading: true
    }
  }

  set(obj, cb) {
    this.setState(obj, cb);
  }

  componentDidMount() {
    this._isMounted = true;
    if (isUser(this.state.user)) return;
    axios.get('/api/users/authenticated_user', { withCredentials: true })
    .then(res => {
      if (this._isMounted) {
        this.setState({ user: res.data, loading: false });
      }
    })
    .catch(err => {
      if (this._isMounted) {
        this.setState({ loading: false });
      }
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <Router history={history}>
        <Switch>
          {ROUTES.map((route) => {
            const C = route.component;
            route.component = (props) => {
              const { loading, user } = this.state;
              if (loading) return <LoadingPage/>;
              if (route.role === 'admin') {
                if (!isAdmin(user)) return <Redirect to="/"/>;
              }
              if (route.role === 'user') {
                if (!isUser(user)) return <Redirect to="/"/>;
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
