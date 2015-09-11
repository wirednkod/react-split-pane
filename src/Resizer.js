// jshint esnext: true
// jshint strict: true
// jshint browser: true
// jshint node: true

'use strict';

import React, { Component } from "react";
import Radium from "radium";

const styles = {
  base: {
    boxSizing: 'border-box',
    backgroundColor: '#000',
    opacity: 0.2,
    zIndex: 1,
    backgroundClip: 'padding-box',
    ':hover': {
      transition: 'all 2s ease'
    }
  },
  horizontal: {
    height: '11px',
    width: '100%',
    margin: '-5px 0',
    borderTop: '5px solid rgba(255, 255, 255, 0)',
    borderBottom: '5px solid rgba(255, 255, 255, 0)',
    cursor: 'row-resize',
    ':hover': {
      borderTop: '5px solid rgba(0, 0, 0, 0.5)',
      borderBottom: '5px solid rgba(0, 0, 0, 0.5)'
    }
  },
  vertical: {
    width: '11px',
    height: '100%',
    margin: '0 -5px',
    borderLeft: '5px solid rgba(255, 255, 255, 0)',
    borderRight: '5px solid rgba(255, 255, 255, 0)',
    cursor: 'col-resize',
    ':hover': {
      borderLeft: '5px solid rgba(0, 0, 0, 0.5)',
      borderRight: '5px solid rgba(0, 0, 0, 0.5)'
    }
  }
};

@Radium
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
      const classes = ['Resizer', split, self.props.className];
      return <span className={classes.join(' ')} style={[styles.base, styles[split]]} onMouseDown={self.onMouseDown.bind(self)} />;
  }
}


export default Resizer;
