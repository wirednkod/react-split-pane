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

var _radium = require("radium");

var _radium2 = _interopRequireDefault(_radium);

var styles = {
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
};

var SplitPane = (function (_Component) {
  _inherits(SplitPane, _Component);

  function SplitPane() {
    _classCallCheck(this, _SplitPane);

    _get(Object.getPrototypeOf(_SplitPane.prototype), "constructor", this).call(this);
    var self = this;
    self.state = {
      active: false,
      resized: false,
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight
    };
    self.lastReportedRef = null;
    window.addEventListener('resize', self, false);
  }

  _createClass(SplitPane, [{
    key: "handleResize",
    value: function handleResize() {
      var self = this;
      self.setState({ windowWidth: window.innerWidth, windowHeight: window.innerHeight });
      if (self.props.onSetSize) {
        var ref = self.refs.pane1;
        if (ref) {
          var refSize = self.getRefSize(ref);
          self.onSetSize(refSize);
        }
      }
    }
  }, {
    key: "onSetSize",
    value: function onSetSize(refSize) {
      var self = this;
      if (self.props.onSetSize) {
        if (refSize != self.lastReportedRef) {
          self.lastReportedRef = refSize;
          self.props.onSetSize(refSize);
        }
      }
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
  }, {
    key: "handleEvent",
    value: function handleEvent(event) {
      var self = this;
      switch (event.type) {
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
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var self = this;
      window.removeEventListener('resize', self, false);
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
        document.addEventListener('mouseup', self, false);
        document.addEventListener('mousemove', self, false);
      }
    }
  }, {
    key: "onMouseUp",
    value: function onMouseUp() {
      var self = this;
      document.removeEventListener('mouseup', self, false);
      document.removeEventListener('mousemove', self, false);
      self.setState({
        active: false
      });
      if (self.props.onSetSize) {
        var ref = self.refs.pane1;
        if (ref) {
          self.onSetSize(self.getRefSize(ref));
        }
      }
    }
  }, {
    key: "getRefSize",
    value: function getRefSize(ref) {
      var self = this;
      if (ref) {
        var element = _reactDom2["default"].findDOMNode(ref);
        var _styles = element.currentStyle ? element.currentStyle : window.getComputedStyle(element, null);
        var width = _styles.width.replace('px', '');
        var height = _styles.height.replace('px', '');
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
          maxSize = self.props.split === 'vertical' ? self.state.windowHeight - 11 : self.state.windowWidth - 11;
        } else {
          maxSize = self.props.maxSize;
        }

        if (!self.props.minSize) {
          minSize = 5;
        } else {
          minSize = self.props.minSize;
        }

        var finalSize = newSize;

        if (newSize < self.props.minSize) {
          finalSize = self.props.minSize;
        }
        if (newSize > self.props.maxSize) {
          finalSize = self.props.maxSize;
        }

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
  }, {
    key: "render",
    value: function render() {
      var self = this;
      var split = self.props.split || 'vertical';
      var children = self.props.children;
      var classes = ['SplitPane', split, self.props.className];
      return _react2["default"].createElement(
        "div",
        { className: classes.join(' '), style: [styles.base, styles[split]], ref: "splitPane" },
        _react2["default"].createElement(
          _Pane2["default"],
          { ref: "pane1", key: "pane1", split: split },
          children[0]
        ),
        _react2["default"].createElement(_Resizer2["default"], { ref: "resizer", key: "resizer", onMouseDown: self.onMouseDown.bind(self), split: split, resizable: self.props.resizable, resizerGripWidth: self.props.resizerGripWidth, resizerBorderWidth: self.props.resizerBorderWidth }),
        _react2["default"].createElement(
          _Pane2["default"],
          { ref: "pane2", key: "pane2", split: split },
          children[1]
        )
      );
    }
  }]);

  var _SplitPane = SplitPane;
  SplitPane = (0, _radium2["default"])(SplitPane) || SplitPane;
  return SplitPane;
})(_react.Component);

SplitPane.defaultProps = {
  minSize: 0,
  maxSize: Infinity,
  defaultSize: 'auto',
  resizable: true,
  resizerBorderWidth: 1,
  resizerGripWidth: 5
};

exports["default"] = SplitPane;
module.exports = exports["default"];
