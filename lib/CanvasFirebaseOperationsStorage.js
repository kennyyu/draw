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
      painting.clearCanvas(false);
    });
  }

  _handleNewOperation(painting: CanvasPainting, operation: CanvasOperation):
      void {
    // operation isn't being deserialized correctly
    if (!operation.hasOwnProperty('locations')) {
      operation.locations = [];
    }

    // If there are no pending operations from us, simply replay this
    // operation.
    if (this._pendingOperations.length == 0) {
      painting.replayCanvasOperation(operation);
      return;
    }

    // See if the new operation is in our list queue of pending operations.
    var pendingOperationIndex = this._pendingOperations.length;
    this._pendingOperations.some((op, i, arr) => {
      if (_.isEqual(op.operation, operation)) {
        pendingOperationIndex = i;
        return true;
      }
      return false;
    });

    // If this is one of our own, we have already executed the operation
    // so there's nothing to do. Otherwise just replay the operation.
    if (pendingOperationIndex != this._pendingOperations.length) {
      this._pendingOperations.splice(pendingOperationIndex);
    } else {
      painting.replayCanvasOperation(operation);
    }
    return;

/*
    // If this is our own operation and it's the first one, there's nothing
    // to do since we already executed the operation.
    if (pendingOperationIndex == 0) {
      this._pendingOperations.splice(pendingOperationIndex);
      return;
    }

    // Otherwise,
    var baseCanvas = this._pendingOperations[0].baseCanvas;
    if (pendingOperationIndex != this._pendingOperations.length) {
      this._pendingOperations.splice(pendingOperationIndex);
    }

    // 1. We need to rewind all the operations before this.
    // Create a temporary canvas
    var me = this;
    var oldPendingOperations = this._pendingOperations.slice();
    var canvas = document.createElement('canvas');
    canvas.width = painting.getCanvasWidth();
    canvas.height = painting.getCanvasHeight();
    var newPainting = new CanvasPainting(canvas, [], []);
    newPainting.setCanvas(baseCanvas, () => {
      // 2. Apply only this operation.
      newPainting.replayCanvasOperation(operation);

      // 3. Reapply the rewinded operations in the same order in pending.
      var newPendingOperations = [];
      console.log('replaying num operations:', oldPendingOperations.length);
      oldPendingOperations.forEach((op, i, arr) => {
        var url = newPainting.getCanvasURL();
        newPainting.replayCanvasOperation(op.operation);
        newPendingOperations.push({
          operation: op.operation,
          baseCanvas: url,
        });
      });
      painting.setCanvas(newPainting.getCanvasURL(), () => {
        me._pendingOperations = newPendingOperations;
        console.log('queue length after:', me._pendingOperations.length);
      });
    });
    */
  }

  put(data: Array<CanvasOperation>): void {
    // not used
  }

  getAll(): Array<CanvasOperation> {
    // not used
    return [];
  }

  enqueueOperation(operation: CanvasPendingOperation): void {
    this._pendingOperations.push(operation);
    this._firebaseRef.push(operation.operation);
  }

  clearOperations(): void {
    this._firebaseRef.remove();
  }

}

export default CanvasFirebaseOperationsStorage;
