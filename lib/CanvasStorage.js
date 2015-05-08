'use babel';
/* @flow */

import CanvasPainting from './CanvasPainting.js';

class CanvasStorage<T> {
  put: (data: T) => void;
  init: (painting: CanvasPainting) => void;
  getAll: () => T;
  clear: () => void;
}

export default CanvasStorage;
