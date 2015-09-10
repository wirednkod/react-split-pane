// jshint esnext: true
// jshint strict: true
// jshint browser: true
// jshint node: true

'use strict';

import React, { Component } from "react";

class Resizer extends Component {

  constructor() {
      super();
  }

  onMouseDown(event) {
    let self = this;
    self.props.onMouseDown(event);
  }

  render() {
      let self = this;
      const split = self.props.split;
      const classes = ['Resizer', split];
      return <span className={classes.join(' ')} onMouseDown={self.onMouseDown.bind(self)} />;
  }
}


export default Resizer;
