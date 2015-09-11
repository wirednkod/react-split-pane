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

var Resizer = (function (_Component) {
  _inherits(Resizer, _Component);

  function Resizer() {
    _classCallCheck(this, _Resizer);

    _get(Object.getPrototypeOf(_Resizer.prototype), "constructor", this).call(this);
  }

  _createClass(Resizer, [{
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

      var extra_style = (0, _objectAssign2["default"])({}, styles.base, styles[split]);

      if (self.props.resizable.toString() === "true") {
        if (split == 'vertical') {
          extra_style = (0, _objectAssign2["default"])({}, extra_style, {
            cursor: 'col-resize',
            ':hover': {
              borderLeft: '5px solid rgba(0, 0, 0, 0.5)',
              borderRight: '5px solid rgba(0, 0, 0, 0.5)'
            }
          });
        } else {
          extra_style = (0, _objectAssign2["default"])({}, extra_style, {
            cursor: 'row-resize',
            ':hover': {
              borderTop: '5px solid rgba(0, 0, 0, 0.5)',
              borderBottom: '5px solid rgba(0, 0, 0, 0.5)'
            }
          });
        }
      }

      var classes = ['Resizer', split, self.props.className];
      // if(resizable) {
      return _react2["default"].createElement("span", { style: [styles.base, extra_style], onMouseDown: self.onMouseDown.bind(self) });
      // }
    }
  }]);

  var _Resizer = Resizer;
  Resizer = (0, _radium2["default"])(Resizer) || Resizer;
  return Resizer;
})(_react.Component);

exports["default"] = Resizer;
module.exports = exports["default"];