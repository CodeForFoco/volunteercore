import React, { Component } from 'react';

export default class Loading extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);

    this.state = {
      dots: 3
    }
  }

  runAnimation() {
    if (_isMounted) {
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

  componentDidMount() {
    this._isMounted = true;
    this.runAnimation();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render () {
    return (
      <div>
        <h3>Loading...</h3>
      </div>
    );
  }
}