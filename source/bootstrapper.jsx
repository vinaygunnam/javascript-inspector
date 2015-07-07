import React from 'react';
import Router, { Route, DefaultRoute } from 'react-router';

import App from './app.jsx';
import Path from './path.jsx';
import Home from './home.jsx';

let routes = (
  <Route>
    <Route name="app" path="/tool/:identifier?" handler={App} />
    <DefaultRoute handler={Home} />
  </Route>
);

Router.run(routes, function(Handler) {
  React.render(<Handler/>, document.getElementById('tool'));
});
