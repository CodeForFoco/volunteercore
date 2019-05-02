import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ROUTES from './routes.js';
import './App.scss';

import Nav from '../../components/Nav/Nav.js';
import Footer from '../../components/Footer/Footer.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      opportunities: {},
      partners: {},
      cookie: ''
    }
  }

  set(obj, cb) {
    this.setState(obj, cb);
  }

  render() {
    return (
      <Router>
        <Nav/>
        <div className='container-fluid'>
          <div className='row justify-content-center'>
            <div className='col-sm-12 col-md-10 col-lg-7'>
              <br/><br/>
              <Switch>
                {ROUTES.map((route) => {
                  const C = route.component;
                  route.component = (props) => {
                    return <C set={this.set.bind(this)} {...this.state} {...props}/>
                  };
                  return (<Route exact {...route} key={'r-' + route.path}/>);
                })}
              </Switch>
              <br/><br/>
            </div>
          </div>
          <Footer/>
        </div>
      </Router>
    );
  }
}

export default App;
