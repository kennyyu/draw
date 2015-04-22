'use babel';
/* @flow */

var {CanvasLocation, CanvasOperation} = require('./CanvasOperation.js');

var STORAGE_KEY = "canvas_storage_key";

class CanvasStorage {

  put(operations: Array<CanvasOperation>): void {
    console.log("PUT");
    console.log(operations);
    var operationsSerialized = JSON.stringify(operations);
    localStorage.setItem(STORAGE_KEY, operationsSerialized);
  }

  getAll(): Array<CanvasOperation> {
    var operations = [];
    var operationsSerialized = localStorage.getItem(STORAGE_KEY);
    if (operationsSerialized != null) {
      operations = JSON.parse(operationsSerialized);
    }
    console.log("GET");
    console.log(operations);
    return operations;
  }

  clear(): void {
    localStorage.clear();
  }
}

module.exports = {CanvasStorage};
