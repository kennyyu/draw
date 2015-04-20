'use babel';
/* @flow */

var {CanvasLocation, CanvasOperation} = require('./CanvasOperation.js');
var {CanvasStorage} = require('./CanvasStorage.js');

class CanvasObserver {
  _operations: Array<CanvasOperation>;
  _storage: CanvasStorage;

  constructor(storage: CanvasStorage) {
    this._storage = storage;
    this._operations = storage.getAll();
  }

  addOperation(operation: CanvasOperation): void {
    this._operations.push(operation);
    this._storage.put(this._operations);
  }
}

module.exports = {CanvasObserver};
