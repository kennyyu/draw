'use babel';
/* @flow */

var {CanvasObserver} = require('./CanvasObserver.js');
var {CanvasOperation} = require('./CanvasOperation.js');
var {CanvasStorage} = require('./CanvasStorage.js');

class CanvasStorageObserver extends CanvasObserver {
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

module.exports = {CanvasStorageObserver};
