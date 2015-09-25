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

var _radium = require("radium");

var _radium2 = _interopRequireDefault(_radium);

var _objectAssign = require("object-assign");

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var styles = {
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
      borderRightColor: 'rgba(0, 0, 0, 0.5)'
    }
  },
  hover_horizontal: {
    cursor: 'row-resize',
    ':hover': {
      borderTopColor: 'rgba(0, 0, 0, 0.5)',
      borderBottomColor: 'rgba(0, 0, 0, 0.5)'
    }
  }
};

var Resizer = (function (_Component) {
  _inherits(Resizer, _Component);

  function Resizer() {
    _classCallCheck(this, _Resizer);

    _get(Object.getPrototypeOf(_Resizer.prototype), "constructor", this).call(this);
  }

  _createClass(Resizer, [{
    key: "getDynamicStyles",
    value: function getDynamicStyles() {
      var gripWidth = +this.props.resizerGripWidth;
      var borderWidth = +this.props.resizerBorderWidth;
      var style = {
        horizontal: {
          height: String(borderWidth + gripWidth * 2) + "px",
          width: '100%',
          marginTop: "-" + String(gripWidth) + "px",
          marginRight: '0',
          marginBottom: "-" + String(gripWidth) + "px",
          marginLeft: '0',
          borderTopWidth: String(gripWidth) + "px",
          borderTopStyle: 'solid',
          borderTopColor: 'rgba(255, 255, 255, 0)',
          borderBottomWidth: String(gripWidth) + "px",
          borderBottomStyle: 'solid',
          borderBottomColor: 'rgba(255, 255, 255, 0)'
        },
        vertical: {
          width: String(borderWidth + gripWidth * 2) + "px",
          height: '100%',
          marginTop: '0',
          marginRight: "-" + String(gripWidth) + "px",
          marginBottom: '0',
          marginLeft: "-" + String(gripWidth) + "px",
          borderLeftWidth: String(gripWidth) + "px",
          borderLeftStyle: 'solid',
          borderLeftColor: 'rgba(255, 255, 255, 0)',
          borderRightWidth: String(gripWidth) + "px",
          borderRightStyle: 'solid',
          borderRightColor: 'rgba(255, 255, 255, 0)'
        }
      };
      return style;
    }
  }, {
    key: "onMouseDown",
    value: function onMouseDown(event) {
      var self = this;
      self.props.onMouseDown(event);
    }
  }, {
    key: "render",
    value: function render() {
      var self = this;
      var split = self.props.split;
      var dynamic_styles = self.getDynamicStyles();
      var extra_style = (0, _objectAssign2["default"])({}, styles.base, dynamic_styles[split]);
      if (self.props.resizable.toString() === "true") {
        extra_style = (0, _objectAssign2["default"])({}, extra_style, styles['hover_' + split]);
      }
      var classes = ['Resizer', split, self.props.className];
      return _react2["default"].createElement("span", { style: [styles.base, extra_style], onMouseDown: self.onMouseDown.bind(self) });
    }
  }]);

  var _Resizer = Resizer;
  Resizer = (0, _radium2["default"])(Resizer) || Resizer;
  return Resizer;
})(_react.Component);

Resizer.defaultProps = {
  resizerBorderWidth: 1,
  resizerGripWidth: 5
};

exports["default"] = Resizer;
module.exports = exports["default"];