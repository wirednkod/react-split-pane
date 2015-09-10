import React from 'react';
import SplitPane from '../lib/SplitPane';


var Example = React.createClass({

    render: function() {
        return (
            <SplitPane split="vertical" minSize="50" defaultSize="100" maxSize="2000">
                <div></div>
                <SplitPane split="horizontal">
                    <div></div>
                    <div></div>
                </SplitPane>
            </SplitPane>
        );
    }

});


React.render(<Example />, document.body);
