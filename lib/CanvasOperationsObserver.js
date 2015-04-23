'use babel';
/* @flow */

var {CanvasObserver} = require('./CanvasObserver.js');
var {CanvasOperation} = require('./CanvasOperation.js');
var {CanvasOperationsStorage} = require('./CanvasOperationsStorage.js');

class CanvasOperationsObserver extends CanvasObserver<CanvasOperation> {
  _operations: Array<CanvasOperation>;
  _storage: CanvasOperationsStorage;

  constructor(storage: CanvasOperationsStorage) {
    this._storage = storage;
    this._operations = this._storage.getAll();
  }

  observe(value: CanvasOperation): void {
    this._operations.push(value);
    this._storage.put(this._operations);
  }

  clear(): void {
    this._storage.clear();
    this._operations = this._storage.getAll();
  }
}

module.exports = {CanvasOperationsObserver};
