'use babel';
/* @flow */

class CanvasLocation {
  x: number;
  y: number;
}

class CanvasOperation {
  beginLocation: CanvasLocation;
  locations: Array<CanvasLocation>;
  brushSize: number;
  brushColor: string;
}

class CanvasPendingOperation {
  operation: CanvasOperation;

  // The state of the canvas when we applied the operation, encoded as
  // a data URL.
  baseCanvas: string;
}

module.exports = {CanvasLocation, CanvasOperation, CanvasPendingOperation};
