// jshint esnext: true
// jshint strict: true
// jshint browser: true
// jshint node: true

'use strict';

import React, { Component } from "react";
import Radium from "radium";

@Radium
class Pane extends Component {

    constructor() {
        super();
        this.state = {};
    }

    render() {
        let self = this;
        const split = self.props.split;
        const classes = ['Pane', split, self.props.className];
        let style = {
            flex: 1,
            position: 'relative',
            outline: 'none',
            overflow: 'auto',
            height: 'inherit',
            minHeight: '1em',
            minWidth: '1em',
            maxHeight: '100%',
            maxWidth: '100%'
        };
        if (self.state.size) {
            if (split === 'horizontal') {
                style.height = self.state.size;
                style.display = 'flex';
            } else {
                style.width = self.state.size;
            }
            style.flex = 'none';
        }
        return <div className={classes.join(' ')} style={style}>{self.props.children}</div>;
    }
}

export default Pane;
