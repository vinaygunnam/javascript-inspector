import React from 'react';
import DocumentTitle from 'react-document-title';

import TopHeader from './top-header.jsx';
import Sidebar from './sidebar.jsx';
import Stage from './stage.jsx';

import cleanAndParse from './helpers/clean-and-parse';

var App = React.createClass({
  getInitialState: function getInitialState() {
    let filterText = null;
    let {
      inspectionPool,
      error,
      identifier
    } = this.inspect(this.props.params.identifier, filterText);
    return {
      identifier,
      inspectionPool,
      filterText
    };
  },

  componentWillReceiveProps: function componentWillReceiveProps(props) {
    let filterText = null;
    let {
      inspectionPool,
      error,
      identifier
    } = this.inspect(props.params.identifier, filterText);
    this.setState({
      identifier: identifier,
      inspectionPool: inspectionPool,
      filterText: filterText,
      actor: null
    });
  },

  inspect: function inspect(identifierToBeInspected, filterText) {
    let error = null,
      inspectionPool = null,
      validParts = [];

    let {
      identifier,
      object
    } = cleanAndParse(identifierToBeInspected);

    if (identifier) {
      if (object) {
        inspectionPool = {
          properties: {},
          methods: {}
        };

        if (typeof object === 'object' || typeof object === 'function') {
          for (var key in object) {
            if (key !== '__proto__' && (!filterText || key.toLowerCase().indexOf(filterText.toLowerCase()) > -1)) {
              var entry = object[key];
              if (typeof entry === 'function') {
                inspectionPool.methods[key] = object[key];
              } else {
                inspectionPool.properties[key] = object[key];
              }
            }
          }
          error = null;
        } else {
          error = 'Not eligible for inspection. Must be an object or a function.';
        }
      } else {
        error = 'Nothing to inspect.';
      }
    } else {
      error = 'Nothing to inspect';
    }

    return {
      inspectionPool: inspectionPool,
      error: error,
      identifier: identifier
    };
  },

  filter: function filter(filterText) {
    let {
      inspectionPool,
      error,
      identifier
    } = this.inspect(this.props.params.identifier, filterText);
    this.setState({
      inspectionPool,
      identifier,
      filterText
    });
  },

  onSelection: function select(selection) {
    if (selection) {
      this.setState({
        actor: selection
      });
    }
  },

  render: function render() {
    let identifier = this.state.identifier || 'HOME';
    let title = `${identifier} - Javascript Inspector`;
    return (
      <DocumentTitle title={title}>
        <div className="app">
          <TopHeader search={this.filter} filterText={this.state.filterText}/>
          <Sidebar identifier={this.state.identifier} inspectionPool={this.state.inspectionPool} onSelection={this.onSelection}/>
          <Stage actor={this.state.actor}/>
        </div>
      </DocumentTitle>
    );
  }
});

module.exports = App;
