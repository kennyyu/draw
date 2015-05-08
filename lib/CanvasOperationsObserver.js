'use babel';
/* @flow */

import CanvasObserver from './CanvasObserver.js';
import {CanvasOperation, CanvasPendingOperation} from './CanvasOperation.js';
import CanvasOperationsStorage from './CanvasOperationsStorage.js';

class CanvasOperationsObserver extends CanvasObserver<CanvasPendingOperation> {
  _operations: Array<CanvasOperation>;
  _storage: CanvasOperationsStorage;

  constructor(storage: CanvasOperationsStorage) {
    this._storage = storage;
    this._operations = this._storage.getAll();
  }

  observe(value: CanvasPendingOperation): void {
    this._operations.push(value.operation);
    this._storage.put(this._operations);
  }

  clear(): void {
    this._storage.clear();
    this._operations = this._storage.getAll();
  }
}

export default CanvasOperationsObserver;
