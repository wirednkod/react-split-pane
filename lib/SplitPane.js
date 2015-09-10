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
    var self = this;
    self.state = {
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
      var self = this;
      var ref = self.refs.pane1;
      if (ref && self.props.defaultSize && !self.state.resized) {
        var defaultSize = self.props.defaultSize;
        if (defaultSize === 'auto') {
          var element = _reactDom2["default"].findDOMNode(ref);
          var total_height = 0;
          for (var i in element.children) {
            total_height += element.children[i].clientHeight || 0;
          }
          ref.setState({
            size: total_height
          });
        } else {
          ref.setState({
            size: defaultSize
          });
        }
      }
      window.addEventListener('resize', self.handleResize.bind(self));
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var self = this;
      window.removeEventListener('resize', self.handleResize);
    }
  }, {
    key: "onMouseDown",
    value: function onMouseDown(event) {
      var self = this;
      if (self.props.resizable === true) {
        var position = self.props.split === 'vertical' ? event.screenX : event.screenY;
        var ref = self.refs.pane1;
        var size = self.getRefSize(ref);
        self.setState({
          active: true,
          startPosition: position,
          startSize: size
        });
        document.addEventListener('mouseup', self.onMouseUp.bind(self));
        document.addEventListener('mousemove', self.onMouseMove.bind(self));
      }
    }
  }, {
    key: "onMouseUp",
    value: function onMouseUp() {
      var self = this;
      self.setState({
        active: false
      });
      document.removeEventListener('mouseup', self.onMouseUp);
      document.removeEventListener('mousemove', self.onMouseMove);
    }
  }, {
    key: "getRefSize",
    value: function getRefSize(ref) {
      var self = this;
      if (ref) {
        var element = _reactDom2["default"].findDOMNode(ref);
        var styles = element.currentStyle ? element.currentStyle : window.getComputedStyle(element, null);
        var width = styles.width.replace('px', '');
        var height = styles.height.replace('px', '');
        var size = self.props.split === 'vertical' ? width : height;
        return size;
      } else {
        return 0;
      }
    }
  }, {
    key: "onMouseMove",
    value: function onMouseMove(event) {
      var self = this;
      var ref = self.refs.pane1;
      if (self.state.active && ref) {

        var current = self.props.split === 'vertical' ? event.screenX : event.screenY;
        var starting = self.state.startPosition;
        var newSize = self.state.startSize - (starting - current);

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
      //console.log(this.props.className, 'className');
      var prefixed = _reactVendorPrefix2["default"].prefix({ styles: style });

      return _react2["default"].createElement(
        "div",
        { className: classes.join(' '), style: prefixed.styles, ref: "splitPane" },
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
  maxSize: Infinity,
  defaultSize: 'auto',
  resizable: true
};

exports["default"] = SplitPane;
module.exports = exports["default"];