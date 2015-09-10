import React from 'react';
import SplitPane from '../lib/SplitPane';


var Example = React.createClass({

    render: function() {
        return (
<<<<<<< HEAD
            <SplitPane defaultSize="900">
=======
            <SplitPane split="vertical" minSize="50" defaultSize="100">
>>>>>>> a0051b8f75fed8f7f152ca8fde7b95856e0b3352
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