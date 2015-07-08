var React = require('react');
import { Link } from 'react-router';

var TopHeader = React.createClass({
  onInput: function onInput(evt) {
    if (this.props.search) {
      this.props.search(evt.target.value);
    }
  },

  render: function() {
    let searchForm = null;

    if (!this.props.disableSearch) {
      searchForm = <form className="search">
          <input autocapitalize="off" autocomplete="off" autocorrect="off"
            className="search-input" maxlength={20} onChange={this.onInput}
            placeholder="Search…" spellcheck="false" type="search"
            value={this.props.filterText}/>
          <a className="search-clear"/>
          <div className="search-tag"/>
        </form>;
    }

    return (
      <header className="header">
        {searchForm}
        <a className="home-link"/>
        <a className="menu-link"/>
        <h1 className="logo">
          <a className="nav-link" title="Javascript Inspector"
            href="//vinaygunnam.github.io/javascript-inspector">Javascript Inspector</a>
        </h1>
        <nav className="nav">
          <a className="nav-link" href="about.html">About</a>
          <a className="nav-link" target="_blank"
            href="https://github.com/vinaygunnam/javascript-inspector">Source</a>
        </nav>
      </header>
    );
  }

});

module.exports = TopHeader;
