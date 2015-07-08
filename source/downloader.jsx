var React = require('react');
import InspectionRequest from './inspection-request.jsx';
import ScriptLoader from './helpers/script-loader';

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
        var loader = new ScriptLoader();
        loader.require([urlInput], () => {
          this.setState({
            ready: true,
            error: null,
            message: null
          });
        });
        this.setState({
          message: 'Downloading ... ',
          ready: false,
          error: null
        });
      }
    }
  },

  render: function() {
    let link = null,
        error = null,
        message = null;

    if (this.state.message) {
      message = <section>
        <img src="public/images/loader.gif" title="Waiting for response" />
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
