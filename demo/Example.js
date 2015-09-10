import React from 'react';
import ReactDOM from 'react-dom';
import SplitPane from '../lib/SplitPane';

var Example = React.createClass({

    onSize: function(size) {
      console.log('new size:', size, Math.random());
    },

    render: function() {
        return (
          <SplitPane split="horizontal" defaultSize="auto" resizable="false">
            <div style={{height: "200px"}}>sadas</div>
            <SplitPane split="vertical" minSize="50" defaultSize="100" maxSize="500">
                <div></div>
                <SplitPane split="horizontal" onSetSize={this.onSize}>
                    <div></div>
                    <div></div>
                </SplitPane>
            </SplitPane>
          </SplitPane>
        );
    }

});


ReactDOM.render(<Example />, document.getElementById('root'));
