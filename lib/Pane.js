// jshint esnext: true
// jshint strict: true
// jshint browser: true
// jshint node: true

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactVendorPrefix = require('react-vendor-prefix');

var _reactVendorPrefix2 = _interopRequireDefault(_reactVendorPrefix);

var Pane = (function (_Component) {
    _inherits(Pane, _Component);

    function Pane() {
        _classCallCheck(this, Pane);

        _get(Object.getPrototypeOf(Pane.prototype), 'constructor', this).call(this);
        this.state = {};
    }

    _createClass(Pane, [{
        key: 'render',
        value: function render() {
            var split = this.props.split;
            var classes = ['Pane', split];
            var style = {
                flex: 1,
                position: 'relative',
                outline: 'none',
                overflow: 'auto',
                minHeight: '1em',
                minWidth: '1em',
                maxHeight: '100%',
                maxWidth: '100%'
            };
            if (this.state.size) {
                if (split === 'horizontal') {
                    style.height = this.state.size;
                    style.display = 'flex';
                } else {
                    style.width = this.state.size;
                }
                style.flex = 'none';
            }
            var prefixed = _reactVendorPrefix2['default'].prefix({ styles: style });
            return _react2['default'].createElement(
                'div',
                { className: classes.join(' '), style: prefixed.styles },
                this.props.children
            );
        }
    }]);

    return Pane;
})(_react.Component);

exports['default'] = Pane;
module.exports = exports['default'];