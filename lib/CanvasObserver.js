'use babel';
/* @flow */

var {CanvasLocation, CanvasOperation} = require('./CanvasOperation.js');

class CanvasObserver {
  operations: Array<CanvasOperation>;

  constructor() {
    this.operations = [];
  }

  addOperation(operation: CanvasOperation): void {
    this.operations.push(operation);
    console.log(this.operations);
  }
}

module.exports = {CanvasObserver};