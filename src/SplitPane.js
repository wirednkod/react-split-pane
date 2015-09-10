// jshint esnext: true
// jshint strict: true
// jshint browser: true
// jshint node: true

'use strict';

import React, { Component } from "react";
import ReactDOM from "react-dom";
import Pane from './Pane';
import Resizer from './Resizer';
import VendorPrefix from 'react-vendor-prefix';

class SplitPane extends Component {

    constructor() {
      super();
      this.state = {
        active: false,
        resized: false,
        windowWidth: window.innerWidth,
        windowHeight: window.innerHeight
      };
    }

    handleResize() {
      this.setState({windowWidth: window.innerWidth, windowHeight: window.innerHeight});
    }

    componentDidMount() {
        const ref = this.refs.pane1;
        if (ref && this.props.defaultSize && !this.state.resized) {
            ref.setState({
                size: this.props.defaultSize
            });
        }
        window.addEventListener('resize', this.handleResize);
    }

    componentWillUnmount() {
      window.removeEventListener('resize', this.handleResize);
    }

    onMouseDown(event) {
      let self = this;
      let position = self.props.split === 'vertical' ? event.screenX : event.screenY;
      let ref = self.refs.pane1;
      let size = self.getRefSize(ref);
      self.setState({
        active: true,
        startPosition: position,
        startSize: size
      });
      document.addEventListener('mouseup', self.onMouseUp.bind(self));
      document.addEventListener('mousemove', self.onMouseMove.bind(self));
    }

    onMouseUp() {
      let self = this;
      self.setState({
        active: false
      });
      document.removeEventListener('mouseup', self.onMouseUp);
      document.removeEventListener('mousemove', self.onMouseMove);
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
          maxSize = self.props.split === 'horizontal' ? self.state.windowWidth - 11 : self.state.windowHeight - 11;
        } else {
          maxSize = self.props.maxSize;
        }

        if(!self.props.minSize){
          minSize = 5;
        } else {
          minSize = self.props.minSize;
        }

        self.setState({
          position: current,
          resized: true
        });

        if (newSize >= self.props.minSize && newSize <= self.props.maxSize) {
          ref.setState({
            size: newSize
          });
        }
      }

        //console.log(maxSize, self.props.minSize, newSize);
    }

    merge(into, obj) {
      for (let attr in obj) {
        into[attr] = obj[attr];
      }
    }

    render() {

        let self = this;
        const split = self.props.split || 'vertical';

        let style = {
            display: 'flex',
            flex: 1,
            position: 'relative',
            outline: 'none',
            overflow: 'hidden',
            userSelect: 'none'
        };

        if (split === 'horizontal') {
            this.merge(style, {
                flexDirection: 'column',
                height: '100%',
                minHeight: '100%',
                position: 'absolute',
                top: 0,
                bottom: 0,
                width: '100%'
            });
        } else {
            this.merge(style, {
                flexDirection: 'row',
                height: '100%',
                position: 'absolute',
                left: 0,
                right: 0
            });
        }

        const children = this.props.children;
        const classes = ['SplitPane', split];
        console.log(this.props.className, 'className');
        const prefixed = VendorPrefix.prefix({styles: style});

        return (
            <div className={classes.join(' ')} style={prefixed.styles} ref="splitPane" winsize={self.state.windowWidth}>
                <Pane ref="pane1" key="pane1" split={split}>{children[0]}</Pane>
                <Resizer ref="resizer" key="resizer" onMouseDown={self.onMouseDown.bind(self)} split={split} />
                <Pane ref="pane2" key="pane2" split={split}>{children[1]}</Pane>
            </div>
        );
    }
}

SplitPane.defaultProps = {
  minSize: 0,
  maxSize: Infinity
};

export default SplitPane;
