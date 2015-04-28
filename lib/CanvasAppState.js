'use babel';
/* @flow */

var {CanvasObserver} = require('./CanvasObserver.js');
var {CanvasOperation, CanvasPendingOperation} = require('./CanvasOperation.js');
var {CanvasPreferences} = require('./CanvasPreferences.js');
var {CanvasStorage} = require('./CanvasStorage.js');

class CanvasAppState {
//  operationsStorage: CanvasStorage<Array<CanvasOperation>>;
//  operationsObservers: Array<CanvasObserver<CanvasPendingOperation>>;
//  preferencesStorage: CanvasStorage<CanvasPreferences>;
//  preferencesObservers: Array<CanvasObserver<CanvasPreferences>>;
  operationsStorage: any;
  operationsObservers: Array<CanvasObserver<CanvasPendingOperation>>;
  preferencesStorage: any;
  preferencesObservers: Array<CanvasObserver<CanvasPreferences>>;
}

module.exports = {CanvasAppState};
