'use babel';
/* @flow */

var {CanvasOperation} = require('./CanvasOperation.js');
var {CanvasStorage} = require('./CanvasStorage.js');

var STORAGE_KEY = 'canvas_operations_storage_key';
var DEFAULT_VALUE : Array<CanvasOperation> = [];

class CanvasOperationsStorage extends CanvasStorage<Array<CanvasOperation>> {
  constructor() {
    super(STORAGE_KEY, DEFAULT_VALUE);
  }
}

module.exports = {CanvasOperationsStorage};
