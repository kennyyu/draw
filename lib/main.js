'use babel';
/* @flow */

var css = require('./css.js');
var React = require('react');
var {CanvasApp} = require('./components/CanvasApp.js');
var {CanvasAppState} = require('./CanvasAppState.js');
var {CanvasOperationsObserver} = require('./CanvasOperationsObserver.js');
var {CanvasOperationsStorage} = require('./CanvasOperationsStorage.js');
var {CanvasPreferencesObserver} = require('./CanvasPreferencesObserver.js');
var {CanvasPreferencesStorage} = require('./CanvasPreferencesStorage.js');

window.React = React;

// Initialize all our app singletons
var operationsStorage = new CanvasOperationsStorage();
var operationsObserver = new CanvasOperationsObserver(operationsStorage);
var preferencesStorage = new CanvasPreferencesStorage();
var preferencesObserver = new CanvasPreferencesObserver(preferencesStorage);

var canvasAppState : CanvasAppState = {
  operationsStorage: operationsStorage,
  operationsObservers: [operationsObserver],
  preferencesStorage: preferencesStorage,
  preferencesObservers: [preferencesObserver],
};

React.render(
  <CanvasApp
    appState={canvasAppState}
    windowWidth={window.innerWidth}
    windowHeight={window.innerHeight}
  />,
  document.getElementById('container')
);
