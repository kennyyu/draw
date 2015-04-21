'use babel';
/* @flow */

var {CanvasObserver} = require('./CanvasObserver.js');
var {CanvasPainting} = require('./CanvasPainting.js');
var {CanvasStorage} = require('./CanvasStorage.js');
var {CanvasStorageObserver} = require('./CanvasStorageObserver.js');

var canvas = document.getElementById('canvas');
// This runtime check is needed for flow
if (!(canvas instanceof HTMLCanvasElement)) {
  throw new Error('HTMLCanvasElement not supported');
}

// Resize the canvas to the full size of the window
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var storage = new CanvasStorage();
var observer: CanvasObserver = new CanvasStorageObserver(storage);
var painting = new CanvasPainting(canvas, [observer]);
painting.init();

// Replay any existing operations
var operations = storage.getAll();
operations.map(painting.replayCanvasOperation.bind(painting));
