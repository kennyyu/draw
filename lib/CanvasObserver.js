'use babel';
/* @flow */

var {CanvasOperation} = require('./CanvasOperation.js');

// Interface for observers to implement
class CanvasObserver {
  addOperation(operation: CanvasOperation): void {};
}

module.exports = {CanvasObserver};
