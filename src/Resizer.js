// jshint esnext: true
// jshint strict: true
// jshint browser: true
// jshint node: true

'use strict';

import React, { Component } from "react";
import Radium from "radium";
import ObjectAssign from "object-assign";

const styles = {
  base: {
    boxSizing: 'border-box',
    backgroundColor: '#000',
    opacity: 0.2,
    zIndex: 1,
    backgroundClip: 'padding-box',
    cursor: 'default',
    transition: 'all 0.5s ease'
  },
  horizontal: {
    height: '11px',
    width: '100%',
    margin: '-5px 0',
    borderTop: '5px solid rgba(255, 255, 255, 0)',
    borderBottom: '5px solid rgba(255, 255, 255, 0)'
  },
  vertical: {
    width: '11px',
    height: '100%',
    margin: '0 -5px',
    borderLeft: '5px solid rgba(255, 255, 255, 0)',
    borderRight: '5px solid rgba(255, 255, 255, 0)'
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

      let extra_style = ObjectAssign({}, styles.base, styles[split]);

      if(self.props.resizable.toString() === "true") {
        if(split == 'vertical') {
           extra_style = ObjectAssign({}, extra_style, {
            cursor: 'col-resize',
            ':hover': {
              borderLeft: '5px solid rgba(0, 0, 0, 0.5)',
              borderRight: '5px solid rgba(0, 0, 0, 0.5)'
            }
          });
        } else {
          extra_style = ObjectAssign({}, extra_style, {
            cursor: 'row-resize',
            ':hover': {
              borderTop: '5px solid rgba(0, 0, 0, 0.5)',
              borderBottom: '5px solid rgba(0, 0, 0, 0.5)',
            }
          });
        }
      }

      const classes = ['Resizer', split, self.props.className];
      return <span style={[styles.base, extra_style]} onMouseDown={self.onMouseDown.bind(self)} />;
  }
}


export default Resizer;
