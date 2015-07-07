var React = require('react');
import validateType from './helpers/validate-type';

var Argument = React.createClass({
  getInitialState: function() {
    let contextType = 'method';
    let { isValid, text, value }
      = validateType(JSON.stringify(this.props.argument), this.props.argType,
            contextType, this.props.methodContext);

    return {
      editing: false,
      argumentLiteral: text,
      argType: this.props.argType,
      context: contextType,
      argument: value,
      isValid: isValid
    };
  },

  toggle: function() {
    this.setState({
      editing: !this.state.editing
    });
  },

  onArgTypeChange: function(evt) {
    let contextType = this.state.context;
    let { isValid, text, value }
      = validateType(this.state.argumentLiteral,
            evt.target.value, contextType, this.props.methodContext);

    this.setState({
      isValid: isValid,
      argumentLiteral: text,
      argument: value,
      argType: evt.target.value
    });
  },

  onContextChange: function onContextChange(evt) {
    let argType = this.state.argType,
        argumentText = this.state.argumentLiteral;
    let { isValid, text, value }
      = validateType(argumentText, argType, evt.target.value, this.props.methodContext);

    this.setState({
      isValid: isValid,
      argumentLiteral: text,
      argument: value,
      argType: argType,
      context: evt.target.value
    });
  },

  onTextChange: function(evt) {
    let argType = this.state.argType,
        contextType = this.state.context;
    let { isValid, text, value }
      = validateType(evt.target.value, argType, contextType, this.props.methodContext);

    this.setState({
      isValid: isValid,
      argumentLiteral: text,
      argument: value,
      argType: argType
    });
  },

  setArgument: function() {
    if (this.props.onSave) {
      this.props.onSave(this.props.index, this.state.argument, this.state.argType);
      this.toggle();
    }
  },

  remove: function remove(evt) {
    evt.stopPropagation();
    if (this.props.onRemove) {
      this.props.onRemove(this.props.index);
    }
  },

  componentDidMount: function componentDidMount(prevProps, prevState) {
    Prism.highlightAll();
  },

  componentDidUpdate: function componentDidUpdate(prevProps, prevState) {
    Prism.highlightAll();
  },

  render: function() {
    let argumentEditor = null,
      argumentDisplay = null,
      contextSelection = null;

    if (this.state.editing) {
      let action = null;
      if (this.state.isValid) {
        action = <button onClick={this.setArgument}>Set argument</button>;
      } else {
        action = <span className="error">Invalid argument or type. Cannot set argument.</span>
      }

      if (this.state.argType === 'Function') {
        contextSelection = <select onChange={this.onContextChange} value={this.state.context}>
          <option value="null">No context</option>
          <option value="method">Same context as the method</option>
          <option value="window">Window</option>
        </select>;
      }

      argumentEditor = <section>
          <select onChange={this.onArgTypeChange} value={this.state.argType}>
            <option>null</option>
            <option>undefined</option>
            <option>Boolean</option>
            <option>Date</option>
            <option>Function</option>
            <option>JSON</option>
            <option>Number</option>
            <option>String</option>
          </select>
          {contextSelection}
          <textarea className="editor"
            rows="10" cols="100" onChange={this.onTextChange}
            value={this.state.argumentLiteral}></textarea>
          {action}
        </section>;
    } else {
      if (this.state.argType === 'Function') {
        argumentDisplay = <section>
            <pre><code className="language-javascript">{this.state.argumentLiteral || 'undefined'}</code></pre>
          </section>;
      } else {
        argumentDisplay = <section>
            <pre><code className="language-javascript">{JSON.stringify(this.state.argument, null, 4) || 'undefined'}</code></pre>
          </section>;
      }
    }

    return (
      <div className="argument">
        <h3 onClick={this.toggle}>
          Argument {this.props.index+1} (click to toggle)
          <button className="action" onClick={this.remove}>Remove</button>
        </h3>
        {argumentEditor}{argumentDisplay}
      </div>
    );
  }
});

module.exports = Argument;
