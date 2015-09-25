// jshint esnext: true
// jshint strict: true
// jshint browser: true
// jshint node: true

'use strict';

import React, { Component } from "react";
import ReactDOM from "react-dom";
import Pane from './Pane';
import Resizer from './Resizer';
import Radium from "radium";

const styles = {
  base: {
    display: 'flex',
    flex: 1,
    outline: 'none',
    overflow: 'hidden',
    userSelect: 'none',
    position: 'absolute'
  },
  vertical: {
    flexDirection: 'row',
    height: '100%',
    left: 0,
    right: 0
  },
  horizontal: {
    flexDirection: 'column',
    height: '100%',
    minHeight: '100%',
    top: 0,
    bottom: 0,
    width: '100%'
  }
}

@Radium
class SplitPane extends Component {

    constructor() {
      super();
      let self = this;
      self.state = {
        active: false,
        resized: false,
        windowWidth: window.innerWidth,
        windowHeight: window.innerHeight
      };
      self.lastReportedRef = null;
      window.addEventListener('resize', self, false);
    }

    handleResize() {
      let self = this;
      self.setState({windowWidth: window.innerWidth, windowHeight: window.innerHeight});
      if(self.props.onSetSize) {
        let ref = self.refs.pane1;
        if(ref) {
          let refSize = self.getRefSize(ref);
          self.onSetSize(refSize);
        }
      }
    }

    onSetSize(refSize) {
      let self = this;
      if(self.props.onSetSize) {
        if(refSize != self.lastReportedRef) {
          self.lastReportedRef = refSize;
          self.props.onSetSize(refSize);
        }
      }
    }

    componentDidMount() {
        let self = this;
        const ref = self.refs.pane1;
        if (ref && self.props.defaultSize && !self.state.resized) {
          let defaultSize = self.props.defaultSize;
          if(defaultSize === 'auto') {
            let element = ReactDOM.findDOMNode(ref);
            let total_height = 0;
            for (var i in element.children) {
              total_height += element.children[i].clientHeight || 0;
            }
            ref.setState({
              size: total_height
            });
            self.setState({
              refSize: total_height
            });
          } else {
            ref.setState({
              size: defaultSize
            });
          }
        }
    }

    handleEvent(event) {
      let self = this;
      switch(event.type) {
        case 'mouseup':
          self.onMouseUp(event);
          break;
        case 'mousemove':
          self.onMouseMove(event);
          break;
        case 'resize':
          self.handleResize(event);
          break;
      }
    }

    componentWillUnmount() {
      let self = this;
      window.removeEventListener('resize', self, false);
    }

    onMouseDown(event) {
      let self = this;
      if(self.props.resizable === true) {
        let position = self.props.split === 'vertical' ? event.screenX : event.screenY;
        let ref = self.refs.pane1;
        let size = self.getRefSize(ref);
        self.setState({
          active: true,
          startPosition: position,
          startSize: size
        });
        document.addEventListener('mouseup', self, false);
        document.addEventListener('mousemove', self, false);
      }
    }

    onMouseUp() {
      let self = this;
      document.removeEventListener('mouseup', self, false);
      document.removeEventListener('mousemove', self, false);
      self.setState({
        active: false
      });
      if(self.props.onSetSize) {
        let ref = self.refs.pane1;
        if(ref) {
          self.onSetSize(self.getRefSize(ref));
        }
      }
    }

    getRefSize(ref) {
      let self = this;
      if (ref) {
        const element = ReactDOM.findDOMNode(ref);
        const styles = element.currentStyle ? element.currentStyle : window.getComputedStyle(element, null);
        const width = styles.width.replace('px', '');
        const height = styles.height.replace('px', '');
        const size = self.props.split === 'vertical' ? width : height;
        return size;
      } else {
        return 0;
      }
    }

    onMouseMove(event) {
      let self = this;
      let ref = self.refs.pane1;
      if (self.state.active && ref) {

        const current = self.props.split === 'vertical' ? event.screenX : event.screenY;
        const starting = self.state.startPosition;
        const newSize = self.state.startSize - (starting - current);

        let maxSize;
        let minSize;

        if(!self.props.maxSize){
          maxSize = self.props.split === 'vertical' ? self.state.windowHeight - 11 : self.state.windowWidth - 11;
        } else {
          maxSize = self.props.maxSize;
        }

        if(!self.props.minSize){
          minSize = 5;
        } else {
          minSize = self.props.minSize;
        }

        let finalSize = newSize;

        if(newSize < self.props.minSize) { finalSize = self.props.minSize; }
        if(newSize > self.props.maxSize) { finalSize = self.props.maxSize; }

        self.setState({
          position: current,
          resized: true,
          refSize: finalSize
        });

        ref.setState({
          size: finalSize
        });
      }
    }

    render() {
        let self = this;
        const split = self.props.split || 'vertical';
        const children = self.props.children;
        const classes = ['SplitPane', split, self.props.className];
        return (
            <div className={classes.join(' ')} style={[styles.base, styles[split]]} ref="splitPane">
                <Pane ref="pane1" key="pane1" split={split}>{children[0]}</Pane>
                <Resizer ref="resizer" key="resizer" onMouseDown={self.onMouseDown.bind(self)} split={split} resizable={self.props.resizable} resizerGripWidth={self.props.resizerGripWidth} resizerBorderWidth={self.props.resizerBorderWidth} />
                <Pane ref="pane2" key="pane2" split={split}>{children[1]}</Pane>
            </div>
        );
    }
}

SplitPane.defaultProps = {
  minSize: 0,
  maxSize: Infinity,
  defaultSize: 'auto',
  resizable: true,
  resizerBorderWidth: 1,
  resizerGripWidth: 5
};

export default SplitPane;
