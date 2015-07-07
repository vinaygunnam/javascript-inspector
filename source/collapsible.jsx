var React = require('react');

var Collapsible = React.createClass({
  getInitialState: function() {
    return {
      collapsed: this.props.collapsed || true
    }
  },

  toggle: function toggle() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  },

  onSelection: function select(evt) {
    if (this.props.onSelection) {
      this.props.onSelection(this.props.path);
    }
  },

  render: function() {
    let { title, subset, isOutermost = false } = this.props;

    if (subset) {
      let count = 0;
      let collapsibles = [];
      for (var key in subset) {
        let entity = subset[key];
        if (typeof entity === 'object' && this.props.level < 2) {
          collapsibles.push(<Collapsible title={key} key={key} path={this.props.path+'->'+key}
                subset={subset[key]} onSelection={this.props.onSelection} level={this.props.level+1} />);
        } else {
          collapsibles.push(<Collapsible title={key} key={key} path={this.props.path+'->'+key}
                onSelection={this.props.onSelection} level={this.props.level+1} />);
        }

        count++;
      }

      let titleClass = "list-item icon-inspector list-dir " + (this.state.collapsed ? '' : 'open');
      let listClass = "list " + (isOutermost ? '' : ' list-sub');

      if (this.state.collapsed) {
        return (
          <a className={titleClass}
            data-slug={title} title={title} onClick={this.toggle}>
            <span className="list-arrow" />
            <span className="list-count">{count}</span>{title}</a>
        );
      } else {
        return (
          <div>
            <a className={titleClass}
              data-slug={title} title={title} onClick={this.toggle}>
              <span className="list-arrow" />
              <span className="list-count">{count}</span>{title}</a>
              <div className="list list-sub">
                {collapsibles}
              </div>
          </div>
        );
      }
    } else {
      return (
        <a className="list-item list-hover"
          data-slug={title} title={title} onClick={this.onSelection}>{title}</a>
      );
    }
  }

});

module.exports = Collapsible;
