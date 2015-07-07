import React from 'react';
import { Link } from 'react-router';

var Choice = React.createClass({

  render: function() {
    return (
      <div className="content">
        <h2 className="content-head is-center">What would you like to inspect?</h2>
        <div className="pure-g">
          <div className="l-box pure-u-1 pure-u-md-1-2 pure-u-lg-1-3">
            <h3 className="content-subhead">
              Something already on this page?
            </h3>
            <p>
              Javascript object already accessible on the current page like "console", "location", etc.
            </p>
            <p>
              <Link to="/internal" className="pure-button pure-button-primary">Find it</Link>
            </p>
          </div>
          <div className="l-box pure-u-1 pure-u-md-1-2 pure-u-lg-1-3">
            <h3 className="content-subhead">
              External library via url
            </h3>
            <p>
              Library that is hosted somewhere else like a CDN.
            </p>
            <p>
              <button className="pure-button pure-button-primary">
                Fetch it
              </button>
            </p>
          </div>
          <div className="l-box pure-u-1 pure-u-md-1-2 pure-u-lg-1-3">
            <h3 className="content-subhead">
              Local script via upload
            </h3>
            <p>
              Script file that is available on your local machine. All uploaded files are deleted after inspection (~10 seconds).
            </p>
            <p>
              <Link to="/upload-file" className="pure-button pure-button-primary">Pitch it</Link>
            </p>
          </div>
        </div>
      </div>
    );
  }

});

module.exports = Choice;
