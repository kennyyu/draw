'use babel';
/* @flow */

var css = require('./css.js');
var React = require('react');
var {CanvasApp} = require('./components/CanvasApp.js');
var {CanvasAppState} = require('./CanvasAppState.js');
var {CanvasFirebaseOperationsStorage} =
    require('./CanvasFirebaseOperationsStorage.js');
var {CanvasFirebaseOperationsObserver} =
    require('./CanvasFirebaseOperationsObserver.js');
var {CanvasOperationsObserver} = require('./CanvasOperationsObserver.js');
var {CanvasOperationsStorage} = require('./CanvasOperationsStorage.js');
var {CanvasObserver} = require('./CanvasObserver.js');
var {CanvasOperation, CanvasPendingOperation} = require('./CanvasOperation.js');
var {CanvasPreferences} = require('./CanvasPreferences.js');
var {CanvasPreferencesObserver} = require('./CanvasPreferencesObserver.js');
var {CanvasPreferencesStorage} = require('./CanvasPreferencesStorage.js');
var {CanvasStorage} = require('./CanvasStorage.js');

window.React = React;
React.initializeTouchEvents(true);

var FIREBASE_URL = 'https://luminous-heat-7513.firebaseio.com';
var CANVAS_ID = 'test_canvas_1';

// Initialize all our app singletons
var operationsStorage = new CanvasOperationsStorage();
var operationsObserver: CanvasObserver<CanvasPendingOperation> =
    new CanvasOperationsObserver(operationsStorage);

var firebaseOperationsStorage =
    new CanvasFirebaseOperationsStorage(FIREBASE_URL, CANVAS_ID);
var firebaseOperationsObserver: CanvasObserver<CanvasPendingOperation> =
    new CanvasFirebaseOperationsObserver(firebaseOperationsStorage);

var preferencesStorage = new CanvasPreferencesStorage();
var preferencesObserver: CanvasObserver<CanvasPreferences> =
    new CanvasPreferencesObserver(preferencesStorage);

var canvasAppState : CanvasAppState = {
  operationsStorage: firebaseOperationsStorage,
  operationsObservers: [firebaseOperationsObserver],
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
