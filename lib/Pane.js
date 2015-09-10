'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactVendorPrefix = require('react-vendor-prefix');

var _reactVendorPrefix2 = _interopRequireDefault(_reactVendorPrefix);

var Pane = _react2['default'].createClass({
    displayName: 'Pane',

    getInitialState: function getInitialState() {
        return {};
    },

    render: function render() {
        var split = this.props.split;
        var classes = ['Pane', split];

        var style = {
            flex: 1,
            position: 'relative',
            outline: 'none',
            overflow: 'auto'
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
});

exports['default'] = Pane;
module.exports = exports['default'];