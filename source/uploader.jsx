var React = require('react');
import InspectionRequest from './inspection-request.jsx';

var Uploader = React.createClass({
  getInitialState: function getInitialState() {
    return {
      ready: false,
      error: null
    };
  },

  readFile: function readFile(file) {
    if (file) {
      var reader = new FileReader();

      reader.onload = (evt) => {
        try {
          var script = document.createElement('script');
          script.innerHTML = reader.result;
          document.body.appendChild(script);

          this.setState({
            error: null,
            ready: true
          });
        } catch (e) {
          console.error(e);
          this.setState({
            error: 'An error occurred while processing the file.'
          });
        } finally {

        }
      };

      reader.readAsText(file);
    }
  },

  onFileSelection: function onFileSelection(evt) {
    if (evt.target.files && evt.target.files.length) {
      this.readFile(evt.target.files[0]);
    }
  },

  render: function() {
    let link = null,
        error = null;

    if (this.state.error) {
      error = <pre><code className="language-javascript">{this.state.error}</code></pre>;
    } else if (this.state.ready) {
      link = <div>
        <h4>Script processed. Ready to inspect?</h4>
        <InspectionRequest/>
      </div>;
    }

    return (
      <div>
        <input type="file" onChange={this.onFileSelection} />
        <hr/>
        {link}{error}
      </div>
    );
  }

});

module.exports = Uploader;
