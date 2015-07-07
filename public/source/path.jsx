var React = require('react');
import {Navigation} from 'react-router';

var Path = React.createClass({
  mixins: [Navigation],

  render: function() {
    this.transitionTo(`/${this.props.params.path}`);
    return (
      <div />
    );
  }

});

module.exports = Path;
