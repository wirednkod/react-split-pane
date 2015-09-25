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
  hover_vertical: {
   cursor: 'col-resize',
     ':hover': {
       borderLeftColor: 'rgba(0, 0, 0, 0.5)',
       borderRightColor: 'rgba(0, 0, 0, 0.5)',
     }
  },
  hover_horizontal: {
    cursor: 'row-resize',
    ':hover': {
      borderTopColor: 'rgba(0, 0, 0, 0.5)',
      borderBottomColor: 'rgba(0, 0, 0, 0.5)',
    }
  }
};

@Radium
class Resizer extends Component {

  constructor() {
      super();
  }

  getDynamicStyles() {
    const gripWidth = +this.props.resizerGripWidth;
    const borderWidth = +this.props.resizerBorderWidth;
    let style = {
      horizontal: {
        height: `${borderWidth + gripWidth * 2}px`,
        width: '100%',
        marginTop: `-${gripWidth}px`,
        marginRight: '0',
        marginBottom: `-${gripWidth}px`,
        marginLeft: '0',
        borderTopWidth: `${gripWidth}px`,
        borderTopStyle: 'solid',
        borderTopColor: 'rgba(255, 255, 255, 0)',
        borderBottomWidth: `${gripWidth}px`,
        borderBottomStyle: 'solid',
        borderBottomColor: 'rgba(255, 255, 255, 0)',
      },
      vertical: {
        width: `${borderWidth + gripWidth * 2}px`,
        height: '100%',
        marginTop: '0',
        marginRight: `-${gripWidth}px`,
        marginBottom: '0',
        marginLeft: `-${gripWidth}px`,
        borderLeftWidth: `${gripWidth}px`,
        borderLeftStyle: 'solid',
        borderLeftColor: 'rgba(255, 255, 255, 0)',
        borderRightWidth: `${gripWidth}px`,
        borderRightStyle: 'solid',
        borderRightColor: 'rgba(255, 255, 255, 0)',
      }
    }
    return style;
  }

  onMouseDown(event) {
    let self = this;
    self.props.onMouseDown(event);
  }

  render() {
      let self = this;
      const split = self.props.split;
      const dynamic_styles = self.getDynamicStyles();
      let extra_style = ObjectAssign({}, styles.base, dynamic_styles[split]);
      if(self.props.resizable.toString() === "true") {
        extra_style = ObjectAssign({}, extra_style, styles['hover_'+split]);
      }
      const classes = ['Resizer', split, self.props.className];
      return <span style={[styles.base, extra_style]} onMouseDown={self.onMouseDown.bind(self)} />;
  }
}

Resizer.defaultProps = {
  resizerBorderWidth: 1,
  resizerGripWidth: 5
};

export default Resizer;
