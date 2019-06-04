import React, { Component } from 'react';
import Wrap from '../../components/Wrap/Wrap';

export default class Loading extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);

    this.state = {
      dots: 3
    }
  }

  runAnimation() {
    if (this._isMounted) {
      let { dots } = this.state;
      if (dots < 3) {
        dots++;
      } else {
        dots = 0;
      }
      this.setState({ dots });
      window.setTimeout(this.runAnimation.bind(this), 300);
    }
  }

  displayDots() {
    let { dots } = this.state;
    let str = '';
    while(str.length !== dots) {
      str += '.';
    }
    return str;
  }

  componentDidMount() {
    this._isMounted = true;
    this.runAnimation();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render () {
    return (
      <Wrap>
        <h3>Loading awesome content{this.displayDots()}</h3>
      </Wrap>
    );
  }
}