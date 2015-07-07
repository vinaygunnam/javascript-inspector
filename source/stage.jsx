var React = require('react');
import MethodInvoker from './method-invoker.jsx';
import PropertyInfo from './property-info.jsx';
import cleanAndParse from './helpers/clean-and-parse';

var Stage = React.createClass({

  render: function() {
    let output = null, note = null;
    let { identifier, object, context } = cleanAndParse(this.props.actor);

    if (identifier) {
      if (typeof object === 'function') {
        output = <MethodInvoker title={identifier} method={object} context={context} />
      } else {
        output = <PropertyInfo title={identifier} property={object} />
      }
    } else {
      note = 'Use the sidebar to explore the available properties and methods.';
    }
    return (
      <section className="container">
        <div className="content">
          <div className="page">
            {output}{note}
          </div>
        </div>
      </section>
    );
  }
});

module.exports = Stage;
