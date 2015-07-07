import React from 'react';
import DocumentTitle from 'react-document-title';

import TopHeader from './top-header.jsx';
import Sidebar from './sidebar.jsx';
import InspectionRequest from './inspection-request.jsx';
import Uploader from './uploader.jsx';
import Downloader from './downloader.jsx';

var Home = React.createClass({
  getInitialState: function getInitialState() {
    return {
      choice: 'inspect'
    };
  },

  onSelection: function onSelection(evt) {
    this.setState({
      choice: evt.target.value
    });
  },

  render: function() {
    let actionComponent = null;

    switch (this.state.choice) {
      case 'local':
        actionComponent = <Uploader/>;
        break;
      case 'remote':
        actionComponent = <Downloader/>;
        break;
      case 'inspect':
      default:
        actionComponent = <InspectionRequest/>;
        break;
    }

    return (
      <DocumentTitle title={'Home - Javascript Inspector'}>
        <div className="app">
          <TopHeader disableSearch={true}/>
          <Sidebar />
          <div className="argument">
            <section className="container">
              <div className="content">
                <div className="page">
                  <h2>What would you like to inspect?</h2>
                  <select onChange={this.onSelection} value={this.state.choice}>
                    <option value="inspect">Script already loaded in the current page</option>
                    <option value="local">Script on my local machine</option>
                    <option value="remote">Remote/external script via URL</option>
                  </select>
                  <br/><br/>
                  {actionComponent}
                </div>
              </div>
            </section>
          </div>
        </div>
      </DocumentTitle>
    );
  }

});

module.exports = Home;
