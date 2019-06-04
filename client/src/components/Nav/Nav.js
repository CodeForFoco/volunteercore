import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import history from '../../utils/history.js';
import { isUser, isAdmin } from '../../utils/validation';

export default class Nav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false
    };
  }

  signout() {
    axios.post('/api/auth/logout')
    .then(res => {
      window.localStorage.setItem('token', undefined);
      this.props.set({ user: {}}, () => {
        history.push('/');
      });
    }).catch(err => {
      alert('Sign Out Failed. Please try refreshing the page.');
    });
  }

  toggleOpen() {
    let other = !this.state.open;
    this.setState({ open: other });
  }

  render () {
    const { user } = this.props;
    return (
      <nav className='navbar navbar-expand-lg navbar-light bg-light'>
        <Link className='navbar-brand' to='/'>Volunteer Core</Link>
        <button className='navbar-toggler' type='button' onClick={this.toggleOpen.bind(this)}>
          <span className='navbar-toggler-icon'></span>
        </button>

        <div className={this.state.open ? 'navbar-collapse' : 'collapse navbar-collapse'} id='navbarColor03'>
          <ul className='navbar-nav mr-auto'>
            {isUser(user) ? (
              <>
                <li className='nav-item'>
                  <Link className='nav-link' to='/opportunities'>Opportunities</Link>
                </li>
                <li className='nav-item'>
                  <Link className='nav-link' to='/partners'>Partners</Link>
                </li>
                {isAdmin(user) ? (
                  <li className='nav-item'>
                    <Link className='nav-link' to='/dashboard/tag_categories/search'>Dashboard</Link>
                  </li>
                ): ''}
              </>
            ): ''}
            <li className='nav-item'>
              <Link className='nav-link' to='/help'>Help</Link>
            </li>
            {isUser(user) ? (
              <li className='nav-item'>
                <span className='nav-link' onClick={this.signout.bind(this)}>Sign Out</span>
              </li>
            ) : (
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