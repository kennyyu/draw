'use babel';
/* @flow */

import _ from 'underscore';
import Firebase from 'firebase';
import {CanvasOperation, CanvasPendingOperation} from './CanvasOperation.js';
import CanvasPainting from './CanvasPainting.js';
import CanvasStorage from './CanvasStorage.js';

class CanvasFirebaseOperationsStorage extends
    CanvasStorage<Array<CanvasOperation>> {
  _firebaseRef: any;
  _pendingOperations: Array<CanvasPendingOperation>;

  constructor(firebaseURL: string, canvasID: string) {
    super();
    this._firebaseRef =
        new Firebase(firebaseURL + '/drawings' + '/' + canvasID + '/ops');
    this._pendingOperations = [];
  }

  init(painting: CanvasPainting): void {
    this._firebaseRef.on('child_added', (snapshot) => {
      this._handleNewOperation(painting, snapshot.val());
    });
    this._firebaseRef.on('child_removed', (snapshot) => {
      this._pendingOperations = [];
      painting.clearCanvas();
    });
  }

  _handleNewOperation(painting: CanvasPainting, operation: CanvasOperation):
      void {
    console.log('CHILD ADDED', operation);

    // If there are no pending operations from us, simply replay this
    // operation.
    if (this._pendingOperations.length == 0) {
      painting.replayCanvasOperation(operation);
      return;
    }

    // See if the new operation is in our list queue of pending operations
    // If this is not one our pending operations, we need to rewind all
    // our pending operations to apply this new operation.
    var pendingOperationIndex = this._pendingOperations.length;
    this._pendingOperations.some((op, i, arr) => {
      if (_.isEqual(op.operation, operation)) {
        pendingOperationIndex = i;
        return true;
      }
      return false;
    });

    // 1. We need to rewind all the operations before this.
    var baseCanvas = this._pendingOperations[0].baseCanvas;
    painting.setCanvas(baseCanvas, () => {
      // 2. Apply only this operation.
      painting.replayCanvasOperation(operation);

      // 3. Reapply the rewinded operations in the same order in pending.
      var pendingOperations = [];
      this._pendingOperations.forEach((op, i, arr) => {
        if (i == pendingOperationIndex) {
          return;
        }
        var url = painting.getCanvasURL();
        painting.replayCanvasOperation(op.operation);
        pendingOperations.push({
          operation: op.operation,
          baseCanvas: url,
        });
      });
      this._pendingOperations = pendingOperations;
    });
  }

  put(data: Array<CanvasOperation>): void {
    // not used
  }

  getAll(): Array<CanvasOperation> {
    // not used
    return [];
  }

  enqueueOperation(operation: CanvasPendingOperation): void {
    console.log('ENQUEUE', operation);
    this._pendingOperations.push(operation);
    this._firebaseRef.push(operation.operation);
  }

  clearOperations(): void {
    console.log('CLEAR');
    this._firebaseRef.remove();
  }

}

export default CanvasFirebaseOperationsStorage;
