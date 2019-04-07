import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ROUTES from './routes.js';
import './App.scss';

import Nav from '../../components/Nav/Nav.js';

class App extends Component {
  render() {
    return (
      <Router>
        <Nav/>
        <div className='container-fluid'>
          <div className='row justify-content-center'>
            <div className='col-sm-12 col-md-9 col-lg-6'>
              <br/><br/>
              <Switch>
                {ROUTES.map((route) => {
                  return (<Route exact {...route}  />);
                })}
              </Switch>
              <br/><br/>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
