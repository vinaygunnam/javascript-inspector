var React = require('react');

import Collapsible from './collapsible.jsx';

var Sidebar = React.createClass({

  render: function() {
    let { identifier, inspectionPool = [] } = this.props;
    let collapsible = null;

    if (identifier) {
      collapsible = <Collapsible title={identifier} subset={inspectionPool} path={identifier}
          isOutermost={true} onSelection={this.props.onSelection} level={1} />;
    }

    return (
      <section className="sidebar">
        <div className="list">
          {collapsible}
        </div>
      </section>
    );
  }

});

module.exports = Sidebar;
