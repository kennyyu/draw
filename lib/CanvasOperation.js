'use babel';
/* @flow */

class CanvasLocation {
  x: number;
  y: number;
}

class CanvasOperation {
  beginLocation: CanvasLocation;
  locations: Array<CanvasLocation>;
}

module.exports = {CanvasLocation, CanvasOperation};
