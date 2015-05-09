'use babel';
/* @flow */

import React from 'react';
import Router from 'react-router';
var {Redirect, Route, RouteHandler} = Router;
import css from './css.js';
import CanvasApp from './components/CanvasApp.js';
import analytics from './analytics.js';
import {FIREBASE_URL} from './constants.js';

window.React = React;
React.initializeTouchEvents(true);

class App extends React.Component {
  render(): any {
    return (
      <RouteHandler
        firebaseURL={FIREBASE_URL}
        windowWidth={window.innerWidth}
        windowHeight={window.innerHeight}
      />
    );
  }
}

class NewCanvas extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  componentDidMount(): void {
    var canvasID = 'xxxxxxxx'.replace(/[xy]/g, (c) => {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
    this.context.router.transitionTo('/d/' + canvasID);
  }

  render(): any {
    return (
      <div />
    );
  }
}

NewCanvas.contextTypes = {
  router: React.PropTypes.func,
};

var routes = (
  <Route handler={App}>
    <Route name='draw' path='d' handler={NewCanvas} />
    <Route name='draw-canvas' path='d/:canvasid' handler={CanvasApp} />
    <Redirect from='' to='draw' />
  </Route>
);

Router.run(routes, (Handler, state) => {
  React.render(<Handler/>, document.getElementById('container'));
  analytics(state);
});
