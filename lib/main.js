'use babel';
/* @flow */

var React = require('react');
var {CanvasApp} = require('./components/CanvasApp.js');

window.React = React;

React.render(
  <CanvasApp
    windowWidth={window.innerWidth}
    windowHeight={window.innerHeight}
  />,
  document.getElementById('container')
);
