'use babel';
/* @flow */

var {CanvasLocation, CanvasOperation} = require('./CanvasOperation.js');

class CanvasObserver {
  _operations: Array<CanvasOperation>;

  constructor() {
    this._operations = [];
  }

  addOperation(operation: CanvasOperation): void {
    this._operations.push(operation);
    console.log(this._operations);
  }
}

module.exports = {CanvasObserver};