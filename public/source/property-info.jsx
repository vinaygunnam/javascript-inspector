var React = require('react');
import {Navigation} from 'react-router';

var PropertyInfo = React.createClass({
  mixins: [Navigation],

  inspect: function inspect(evt) {
    this.transitionTo('app', { identifier: this.props.title });
  },
  
  componentDidMount: function componentDidMount(prevProps, prevState) {
    Prism.highlightAll();
  },

  componentDidUpdate: function componentDidUpdate(prevProps, prevState) {
    Prism.highlightAll();
  },

  render: function() {
    let isObject = typeof this.props.property === 'object';
    //let inspection = isObject ? <button className="action" onClick={this.inspect}>Inspect</button> : null;
    let inspection = isObject ? <button className="action" onClick={this.inspect}>Inspect</button> : null;

    let description = null,
        error = null;

    try {
      description = JSON.stringify(this.props.property, null, 4);
    } catch (e) {
      description = 'Difficult to describe this one. Inspect it instead.';
      error = <pre><code className="language-javascript">{JSON.stringify(e, null, 4)}</code></pre>;
    } finally {

    }

    return (
      <div>
        <p className="links"></p>
        <h1>
          {this.props.title}
          {inspection}
        </h1>
        <section>
          <pre><code className="language-javascript">{description}</code></pre>
        </section>
        {error}
      </div>
    );
  }

});

module.exports = PropertyInfo;
