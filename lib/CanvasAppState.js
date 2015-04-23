'use babel';
/* @flow */

var {CanvasOperationsObserver} = require('./CanvasOperationsObserver.js');
var {CanvasOperationsStorage} = require('./CanvasOperationsStorage.js');
var {CanvasPreferencesObserver} = require('./CanvasPreferencesObserver.js');
var {CanvasPreferencesStorage} = require('./CanvasPreferencesStorage.js');

class CanvasAppState {
  operationsStorage: CanvasOperationsStorage;
  operationsObservers: Array<CanvasOperationsObserver>;
  preferencesStorage: CanvasPreferencesStorage;
  preferencesObservers: Array<CanvasPreferencesObserver>;
}

module.exports = {CanvasAppState};
