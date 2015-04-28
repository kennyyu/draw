'use babel';
/* @flow */

var {CanvasPainting} = require('./CanvasPainting.js');

class CanvasStorage<T> {
  put: (data: T) => void;
  init: (painting: CanvasPainting) => void;
  getAll: () => T;
  clear: () => void;
}

module.exports = {CanvasStorage};
