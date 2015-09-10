'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Pane = require('./Pane');

var _Pane2 = _interopRequireDefault(_Pane);

var _Resizer = require('./Resizer');

var _Resizer2 = _interopRequireDefault(_Resizer);

var _reactVendorPrefix = require('react-vendor-prefix');

var _reactVendorPrefix2 = _interopRequireDefault(_reactVendorPrefix);

var SplitPane = _react2['default'].createClass({
    displayName: 'SplitPane',

    getInitialState: function getInitialState() {

        return {
            active: false,
            resized: false
        };
    },

    getDefaultProps: function getDefaultProps() {
        return {
            minSize: 0
        };
    },

    componentDidMount: function componentDidMount() {
        document.addEventListener('mouseup', this.onMouseUp);
        document.addEventListener('mousemove', this.onMouseMove);
        var ref = this.refs.pane1;
        if (ref && this.props.defaultSize && !this.state.resized) {
            ref.setState({
                size: this.props.defaultSize
            });
        }
    },

    componentWillUnmount: function componentWillUnmount() {
        document.removeEventListener('mouseup', this.onMouseUp);
        document.removeEventListener('mousemove', this.onMouseMove);
    },

    onMouseDown: function onMouseDown(event) {
        var position = this.props.split === 'vertical' ? event.clientX : event.clientY;
        this.setState({
            active: true,
            position: position
        });
    },

    onMouseMove: function onMouseMove(event) {
        if (this.state.active) {
            var ref = this.refs.pane1;
            if (ref) {
                var node = ref.getDOMNode();
                if (window.getComputedStyle) {
                    var styles = window.getComputedStyle(node);
                    var width = styles.width.replace('px', '');
                    var height = styles.height.replace('px', '');
                    var current = this.props.split === 'vertical' ? event.clientX : event.clientY;
                    var size = this.props.split === 'vertical' ? width : height;
                    var position = this.state.position;

                    var newSize = size - (position - current);

                    if (!this.props.maxSize) {
                        var maxSize = this.props.orientation === 'horizontal' ? window.innerWidth - 11 : window.innerHeight - 11;
                    } else {
                        var maxSize = this.props.maxSize;
                    };
                    if (!this.props.minSize) {
                        var minSize = 5;
                    } else {
                        var minSize = this.props.minSize;
                    };
                    this.setState({
                        position: current,
                        resized: true
                    });

                    if (newSize >= this.props.minSize && newSize <= this.props.maxSize) {
                        ref.setState({
                            size: newSize
                        });
                    }
                    console.log(maxSize, this.props.minSize, newSize);
                }
            }
        }
    },

    onMouseUp: function onMouseUp() {
        this.setState({
            active: false
        });
    },

    merge: function merge(into, obj) {
        for (var attr in obj) {
            into[attr] = obj[attr];
        }
    },

    render: function render() {

        var split = this.props.split || 'vertical';

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
        var prefixed = _reactVendorPrefix2['default'].prefix({ styles: style });

        return _react2['default'].createElement(
            'div',
            { className: classes.join(' '), style: prefixed.styles, ref: 'splitPane' },
            _react2['default'].createElement(
                _Pane2['default'],
                { ref: 'pane1', key: 'pane1', split: split },
                children[0]
            ),
            _react2['default'].createElement(_Resizer2['default'], { ref: 'resizer', key: 'resizer', onMouseDown: this.onMouseDown, split: split }),
            _react2['default'].createElement(
                _Pane2['default'],
                { ref: 'pane2', key: 'pane2', split: split },
                children[1]
            )
        );
    }
});

exports['default'] = SplitPane;
module.exports = exports['default'];