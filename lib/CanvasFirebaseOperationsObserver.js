'use babel';
/* @flow */

var {CanvasObserver} = require('./CanvasObserver.js');
var {CanvasOperation, CanvasPendingOperation} = require('./CanvasOperation.js');
var {CanvasFirebaseOperationsStorage} =
    require('./CanvasFirebaseOperationsStorage.js');

class CanvasFirebaseOperationsObserver extends
    CanvasObserver<CanvasPendingOperation> {
  _firebaseOperationsStorage: CanvasFirebaseOperationsStorage;

  constructor(storage: CanvasFirebaseOperationsStorage) {
    this._firebaseOperationsStorage = storage;
  }

  observe(value: CanvasPendingOperation): void {
    this._firebaseOperationsStorage.enqueueOperation(value);
  }

  clear(): void {
    this._firebaseOperationsStorage.clearOperations();
  }
}

module.exports = {CanvasFirebaseOperationsObserver};
