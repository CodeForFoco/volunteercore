import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class Nav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false
    };
  }

  signout() {
    axios.post('/api/token/logout', {}, { headers: {
      Authorization: 'Bearer ' + this.props.token
    }}).then(res => {
      window.localStorage.setItem('token', undefined);
      window.location.href = '/';
    }).catch(err => {
      alert('Sign Out Failed. Please try refreshing the page.');
    });
  }

  toggleOpen() {
    let other = !this.state.open;
    this.setState({ open: other });
  }

  render () {
    return (
      <nav className='navbar navbar-expand-lg navbar-light bg-light'>
        <Link className='navbar-brand' to='/'>Volunteer Core</Link>
        <button className='navbar-toggler' type='button' onClick={this.toggleOpen.bind(this)}>
          <span className='navbar-toggler-icon'></span>
        </button>

        <div className={this.state.open ? 'navbar-collapse' : 'collapse navbar-collapse'} id='navbarColor03'>
          <ul className='navbar-nav mr-auto'>
            <li className='nav-item'>
              <Link className='nav-link' to='/opportunities'>Opportunities</Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to='/partners'>Partners</Link>
            </li>
            {this.props.token ? (
              <>
                <li className='nav-item'>
                  <Link className='nav-link' to='/dashboard/opportunities/search'>Dashboard</Link>
                </li>
                <li className='nav-item'>
                  <span className='nav-link' onClick={this.signout.bind(this)}>Sign Out</span>
                </li>
              </>
            ): (
              <li className='nav-item'>
                <Link className='nav-link' to='/'>Sign In</Link>
              </li>
            )}
          </ul>
          {/*
          <form className='form-inline my-2 my-lg-0'>
            <input className='form-control mr-sm-2' type='text' placeholder='Search Opportunities'/>
            <button className='btn btn-secondary my-2 my-sm-0' type='submit'>Search</button>
          </form>*/}
        </div>
      </nav>
    );
  }
}