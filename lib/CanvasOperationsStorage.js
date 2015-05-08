'use babel';
/* @flow */

import CanvasLocalStorage from './CanvasLocalStorage.js';
import {CanvasOperation} from './CanvasOperation.js';
import CanvasPainting from './CanvasPainting.js';

var STORAGE_KEY = 'canvas_operations_storage_key';
var DEFAULT_VALUE : Array<CanvasOperation> = [];

class CanvasOperationsStorage extends
    CanvasLocalStorage<Array<CanvasOperation>> {
  constructor() {
    super(STORAGE_KEY, DEFAULT_VALUE);
  }

  init(painting: CanvasPainting): void {
    var operations = super.getAll();
    operations.map(painting.replayCanvasOperation.bind(painting));
  }
}

export default CanvasOperationsStorage;
