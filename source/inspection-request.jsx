var React = require('react');
import {Navigation} from 'react-router';

var InspectionRequest = React.createClass({
  mixins: [Navigation],

  inspect: function inspect() {
    let identifier = React.findDOMNode(this.refs.identifier).value;
    if (identifier) {
      this.transitionTo('app', { identifier: identifier });
    }
  },

  render: function() {
    return (
      <div>
        <input placeholder="What is the identifier to access the script to be inspected?" ref="identifier"
          style={{width: '400px'}} />
        <button onClick={this.inspect}>Inspect</button>
      </div>
    );
  }

});

module.exports = InspectionRequest;
