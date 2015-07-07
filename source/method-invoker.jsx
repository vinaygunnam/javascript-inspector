var React = require('react');
import Argument from './argument.jsx';

var MethodInvoker = React.createClass({
  getInitialState: function getInitialState() {
    return {
      arguments: [],
      showArguments: true
    }
  },

  toggleArguments: function toggleArguments() {
    this.setState({
      showArguments: !this.state.showArguments
    });
  },

  addArgument: function addArgument() {
    let args = this.state.arguments;
    args.push({
      type: 'undefined',
      value: undefined
    });
    this.setState({
      arguments: args
    });
  },

  setArgument: function setArgument(index, argument, argType) {
    let argumentCollection = this.state.arguments;
    if (index > -1 && index < argumentCollection.length) {
      let argumentToBeUpdated = argumentCollection[index];
      argumentToBeUpdated.type = argType;
      argumentToBeUpdated.value = argument;

      this.setState({
        arguments: argumentCollection
      });
    }
  },

  removeArgument: function removeArgument(index) {
    let argumentCollection = this.state.arguments;
    if (index > -1 && index < argumentCollection.length) {
      argumentCollection.splice(index, 1);
      this.setState({
        arguments: argumentCollection
      });
    }
  },

  invokeMethod: function invokeMethod() {
    let args = this.state.arguments.map((arg) => arg.value);
    let result = this.props.method.apply(this.props.context, args);
    let isPromise = false,
        isSuccess = false,
        isLoading = false;

    if (result) {
      let successFn = (response) => {
        result = response;
        isLoading = !(isSuccess = true);
        this.setState({
          isPromise,
          isSuccess,
          isLoading,
          result: JSON.stringify(result, null, 4)
        });
      };

      let errorFn = (response) => {
        result = response;
        isLoading = false;
        this.setState({
          isPromise,
          isSuccess,
          isLoading,
          result: JSON.stringify(result, null, 4)
        });
      };

      if ((result.success && typeof result.success === 'function')
            || (result.error && typeof result.error === 'function')) {
        isPromise = true;
        isLoading = true;

        if (result.success) {
          result.success(successFn);
        }

        if (result.error) {
          result.error(errorFn);
        }
      } else if (result.then) {
        isPromise = true;
        isLoading = true;
        result.then(successFn, errorFn);
      }
    }

    this.setState({
      isPromise,
      isSuccess,
      isLoading,
      result: JSON.stringify(result, null, 4)
    });
  },

  componentDidMount: function componentDidMount(prevProps, prevState) {
    Prism.highlightAll();
  },

  componentDidUpdate: function componentDidUpdate(prevProps, prevState) {
    Prism.highlightAll();
  },

  render: function() {
    let args = null,
        promiseSection = null;

    if (this.state.showArguments) {
      args = this.state.arguments
              .map((arg, index) => <Argument index={index} key={index} methodContext={this.props.context}
                                      argument={arg.value} argType={arg.type} onSave={this.setArgument}
                                      onRemove={this.removeArgument} />);
    }

    if (this.state.isPromise) {
      if (this.state.isLoading) {
        promiseSection = <section>Promise in progress ... <img src="public/images/loader.gif" title="Waiting for response" /></section>
      } else if (this.state.isSuccess) {
        promiseSection = <section>Promise has been resolved.</section>;
      } else {
        promiseSection = <section>Promise has been rejected.</section>;
      }
    }

    return (
      <div>
        <p className="links"></p>
        <h1>
          {this.props.title}
          <button className="action" onClick={this.invokeMethod}>Run</button>
        </h1>
        <div className="argument-container">
          <h2 className="first-heading">
            Arguments
            <button className="action" onClick={this.addArgument}>Add an argument</button>
          </h2>
          {args}
        </div>
        <div className="argument-container">
          <h2 className="first-heading">Result</h2>
          {promiseSection}
          <pre><code className="language-javascript">{this.state.result}</code></pre>
        </div>
      </div>
    );
  }

});

module.exports = MethodInvoker;
