import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Nav extends Component {
  render () {
    return (
      <nav className='navbar navbar-expand-lg navbar-light bg-light'>
        <Link className='navbar-brand' to='#'>Volunteer Force</Link>
        <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarColor03' aria-controls='navbarColor03' aria-expanded='false' aria-label='Toggle navigation'>
          <span className='navbar-toggler-icon'></span>
        </button>

        <div className='collapse navbar-collapse' id='navbarColor03'>
          <ul className='navbar-nav mr-auto'>
            <li className='nav-item active'>
              <Link className='nav-link' to='/'>Home <span className='sr-only'>(current)</span></Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to='/opportunities'>Opportunities</Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to='/partners'>Partners</Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to='/login'>Login</Link>
            </li>
          </ul>
          <form className='form-inline my-2 my-lg-0'>
            <input className='form-control mr-sm-2' type='text' placeholder='Search'/>
            <button className='btn btn-secondary my-2 my-sm-0' type='submit'>Search</button>
          </form>
        </div>
      </nav>
    );
  }
}