'use babel';
/* @flow */

var {CanvasObserver} = require('./CanvasObserver.js')
var {CanvasPainting} = require('./CanvasPainting.js');

var canvas = document.getElementById('canvas');
// This runtime check is needed for flow
if (!(canvas instanceof HTMLCanvasElement)) {
  throw new Error('HTMLCanvasElement not supported');
}
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var observer = new CanvasObserver();

var painting = new CanvasPainting(canvas);
painting.addObserver(observer);
painting.init();