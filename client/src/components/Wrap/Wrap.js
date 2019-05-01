import React, { Component } from 'react';
import Footer from '../../components/Footer/Footer.js';

export default class DefaultWrap extends Component {
  render () {
    return (
      <div className='container-fluid'>
        <div className='row justify-content-center'>
          <div className='col-sm-12 col-md-10 col-lg-7'>
            <br/><br/>
            {this.props.children}
            <br/><br/>
          </div>
        </div>
        <Footer/>
      </div>
    );
  }
}