'use babel';
/* @flow */

var {CanvasPainting} = require('./CanvasPainting.js');
var {CanvasStorage} = require('./CanvasStorage.js');

class CanvasLocalStorage<T> extends CanvasStorage<T> {
  _storageKey: string;
  _defaultValue: T;

  constructor(storageKey: string, defaultValue: T) {
    this._storageKey = storageKey;
    this._defaultValue = defaultValue;
  }

  put(data: T): void {
    console.log("PUT", data);
    var serialized = JSON.stringify(data);
    localStorage.setItem(this._storageKey, serialized);
  }

  // Abstract
  init(painting: CanvasPainting): void {}

  getAll(): T {
    var data = this._defaultValue;
    var serialized = localStorage.getItem(this._storageKey);
    if (serialized != null) {
      data = JSON.parse(serialized);
    }
    console.log("GET", data);
    console.log(data);
    return data;
  }

  clear(): void {
    localStorage.removeItem(this._storageKey);
  }
}

module.exports = {CanvasLocalStorage};
