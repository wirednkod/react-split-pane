// jshint esnext: true
// jshint strict: true
// jshint browser: true
// jshint node: true

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _Pane = require('./Pane');

var _Pane2 = _interopRequireDefault(_Pane);

var _Resizer = require('./Resizer');

var _Resizer2 = _interopRequireDefault(_Resizer);

var _reactVendorPrefix = require('react-vendor-prefix');

var _reactVendorPrefix2 = _interopRequireDefault(_reactVendorPrefix);

var SplitPane = (function (_Component) {
  _inherits(SplitPane, _Component);

  function SplitPane() {
    _classCallCheck(this, SplitPane);

    _get(Object.getPrototypeOf(SplitPane.prototype), "constructor", this).call(this);
    this.state = {
      active: false,
      resized: false,
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight
    };
  }

  _createClass(SplitPane, [{
    key: "handleResize",
    value: function handleResize() {
      this.setState({ windowWidth: window.innerWidth, windowHeight: window.innerHeight });
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      window.addEventListener('resize', this.handleResize);
      document.addEventListener('mouseup', this.onMouseUp.bind(this));
      document.addEventListener('mousemove', this.onMouseMove.bind(this));
      var ref = this.refs.pane1;
      if (ref && this.props.defaultSize && !this.state.resized) {
        ref.setState({
          size: this.props.defaultSize
        });
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.removeEventListener('resize', this.handleResize);
      document.removeEventListener('mouseup', this.onMouseUp);
      document.removeEventListener('mousemove', this.onMouseMove);
    }
  }, {
    key: "onMouseDown",
    value: function onMouseDown(event) {
      var position = this.props.split === 'vertical' ? event.clientX : event.clientY;
      this.setState({
        active: true,
        position: position
      });
    }
  }, {
    key: "onMouseMove",
    value: function onMouseMove(event) {
      var self = this;
      if (self.state.active) {
        var ref = this.refs.pane1;
        if (ref) {
          var element = _reactDom2["default"].findDOMNode(ref);
          var styles = element.currentStyle ? element.currentStyle : window.getComputedStyle(element, null);
          var width = styles.width.replace('px', '');
          var height = styles.height.replace('px', '');
          var current = self.props.split === 'vertical' ? event.clientX : event.clientY;
          var size = self.props.split === 'vertical' ? width : height;
          var position = self.state.position;
          var newSize = size - (position - current);

          var maxSize = undefined;
          var minSize = undefined;

          if (!self.props.maxSize) {
            maxSize = self.props.split === 'horizontal' ? self.state.windowWidth - 11 : self.state.windowHeight - 11;
          } else {
            maxSize = self.props.maxSize;
          }

          if (!self.props.minSize) {
            minSize = 5;
          } else {
            minSize = self.props.minSize;
          }

          this.setState({
            position: current,
            resized: true
          });

          if (newSize >= self.props.minSize && newSize <= self.props.maxSize) {
            ref.setState({
              size: newSize
            });
          }

          //console.log(maxSize, self.props.minSize, newSize);
        }
      }
    }
  }, {
    key: "onMouseUp",
    value: function onMouseUp() {
      this.setState({
        active: false
      });
    }
  }, {
    key: "merge",
    value: function merge(into, obj) {
      for (var attr in obj) {
        into[attr] = obj[attr];
      }
    }
  }, {
    key: "render",
    value: function render() {

      var self = this;
      var split = self.props.split || 'vertical';

      var style = {
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

      var children = this.props.children;
      var classes = ['SplitPane', split];
      var prefixed = _reactVendorPrefix2["default"].prefix({ styles: style });

      return _react2["default"].createElement(
        "div",
        { className: classes.join(' '), style: prefixed.styles, ref: "splitPane", winsize: self.state.windowWidth },
        _react2["default"].createElement(
          _Pane2["default"],
          { ref: "pane1", key: "pane1", split: split },
          children[0]
        ),
        _react2["default"].createElement(_Resizer2["default"], { ref: "resizer", key: "resizer", onMouseDown: self.onMouseDown.bind(self), split: split }),
        _react2["default"].createElement(
          _Pane2["default"],
          { ref: "pane2", key: "pane2", split: split },
          children[1]
        )
      );
    }
  }]);

  return SplitPane;
})(_react.Component);

SplitPane.defaultProps = {
  minSize: 0,
  maxSize: Infinity
};

exports["default"] = SplitPane;
module.exports = exports["default"];