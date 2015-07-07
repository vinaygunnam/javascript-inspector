var React = require('react');
import InspectionRequest from './inspection-request.jsx';

var Downloader = React.createClass({
  getInitialState: function getInitialState() {
    return {
      ready: false,
      error: null,
      message: null
    };
  },

  download: function download() {
    let url = null;
    if (this.refs.url) {
      let urlInput = React.findDOMNode(this.refs.url).value;
      if (urlInput) {
        var req = new XMLHttpRequest();
        req.addEventListener('progress', (evt) => {
          let message = null;
          if (evt.lengthComputable) {
            var percentComplete = evt.loaded / evt.total;
            message = `Downloading ... ${percentComplete}%`;
          } else {
            message = `Downloading ... `;
          }

          this.setState({
            message,
            ready: false,
            error: null
          });
        });

        req.addEventListener('load', (evt) => {
          try {
            eval(req.responseText);
            this.setState({
              ready: true,
              error: null,
              message: null
            });
          } catch (e) {
            this.setState({
              ready: true,
              error: 'An error occurred while processing the file.',
              message: null
            });
          } finally {

          }
        });

        req.addEventListener('error', (evt) => {
          this.setState({
            error: 'An error occurred while downloading the file.',
            ready: false,
            message: null
          });
        });

        req.addEventListener('abort', (evt) => {
          this.setState({
            error: 'Download request is aborted. Check your network and try again.',
            ready: false,
            message: null
          });
        });

        req.open('GET', urlInput, true);
        req.send();
      }
    }
  },

  render: function() {
    let link = null,
        error = null,
        message = null;

    if (this.state.message) {
      message = <section>
        <img src="/images/loader.gif" title="Waiting for response" />
        {this.state.message}
      </section>;
    }

    if (this.state.error) {
      error = <pre><code className="language-javascript">{this.state.error}</code></pre>;
    } else if (this.state.ready) {
      link = <div>
        <h4>Download complete. Ready to inspect?</h4>
        <InspectionRequest/>
      </div>;
    }

    return (
      <div>
        <input type="text" ref="url" placeholder="Enter the url for the remote script"
          style={{width: '400px'}}/>
        <button onClick={this.download}>Download</button>
        <hr/>
        {link}{error}{message}
      </div>
    );
  }

});

module.exports = Downloader;
