'use babel';
/* @flow */

import CanvasObserver from './CanvasObserver.js';
import {CanvasOperation, CanvasPendingOperation} from './CanvasOperation.js';
import CanvasFirebaseOperationsStorage
    from './CanvasFirebaseOperationsStorage.js';

class CanvasFirebaseOperationsObserver extends
    CanvasObserver<CanvasPendingOperation> {
  _firebaseOperationsStorage: CanvasFirebaseOperationsStorage;

  constructor(storage: CanvasFirebaseOperationsStorage) {
    super();
    this._firebaseOperationsStorage = storage;
  }

  observe(value: CanvasPendingOperation): void {
    this._firebaseOperationsStorage.enqueueOperation(value);
  }

  clear(): void {
    this._firebaseOperationsStorage.clearOperations();
  }
}

export default CanvasFirebaseOperationsObserver;
