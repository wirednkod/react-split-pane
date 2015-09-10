// jshint esnext: true
// jshint strict: true
// jshint browser: true
// jshint node: true

'use strict';

import React, { Component } from "react";
import VendorPrefix from 'react-vendor-prefix';

class Pane extends Component {

    constructor() {
        super();
        this.state = {};
    }

    render() {
        const split = this.props.split;
        const classes = ['Pane', split];
        let style = {
            flex: 1,
            position: 'relative',
            outline: 'none',
            overflow: 'auto',
            minHeight: '10px',
            minWidth: '10px',
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
        const prefixed = VendorPrefix.prefix({styles: style});
        return <div className={classes.join(' ')} style={prefixed.styles}>{this.props.children}</div>;
    }
}

export default Pane;
