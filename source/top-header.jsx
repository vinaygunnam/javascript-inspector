var React = require('react');

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
        <input type="search" className="search-input" placeholder="Search…"
          autocomplete="off" autocapitalize="off" autocorrect="off"
          value={this.props.filterText}
          spellcheck="false" maxlength={20} onChange={this.onInput} />
        <a className="search-clear" />
        <div className="search-tag" />
      </form>;
    }

    return (
      <header className="header">
        {searchForm}
        <a className="home-link" />
        <a className="menu-link" />
        <h1 className="logo">
          <a href="/" className="nav-link" title="Javascript Inspector">Javascript Inspector</a>
        </h1>
      </header>
    );
  }

});

module.exports = TopHeader;
