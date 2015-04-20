'use babel';
/* @flow */

var {CanvasObserver} = require('./CanvasObserver.js')
var {CanvasLocation, CanvasOperation} = require('./CanvasOperation.js')

class CanvasPainting {
  _canvas: HTMLCanvasElement;
  _context: CanvasRenderingContext2D;
  _currentOperation: ?CanvasOperation;
  _canvasObservers: Array<CanvasObserver>;

  constructor(canvas: HTMLCanvasElement, observers: Array<CanvasObserver>) {
    this._canvas = canvas;
    var context = canvas.getContext('2d');
    // This runtime check is needed for flow
    if (!(context instanceof CanvasRenderingContext2D)) {
      throw new Error('Canvas does not support 2d context');
    }
    this._context = context;
    this._currentOperation = null;
    this._canvasObservers = observers;
  }

  init(): void {
    this._canvas.addEventListener('mousedown', this.mousedown.bind(this), false);
    this._canvas.addEventListener('mousemove', this.mousemove.bind(this), false);
    this._canvas.addEventListener('mouseup', this.mouseup.bind(this), false);
    this._context.strokeStyle = '#000000';
    this._context.fillStyle = '#000000';
    this._context.lineWidth = 5;
    this._context.lineJoin = 'round';
    this._context.lineCap = 'round';
  }

  _getCanvasCoords(x: number, y: number): CanvasLocation {
    return {
      x: x - this._canvas.offsetLeft,
      y: y - this._canvas.offsetTop,
    }
  }

  startPath(loc: CanvasLocation): void {
    this._context.beginPath();
    this._context.moveTo(loc.x, loc.y);
    this._context.arc(
        loc.x, loc.y, this._context.lineWidth / 4 - 1, 0, Math.PI * 2);
    this._context.fill();
  }

  continuePath(loc: CanvasLocation): void {
    this._context.lineTo(loc.x, loc.y);
    this._context.stroke();
  }

  replayCanvasOperation(operation: CanvasOperation): void {
    this.startPath(operation.beginLocation);
    operation.locations.forEach(this.continuePath.bind(this));
  }

  emitCanvasOperation(): void {
    if (this._currentOperation != null) {
      // Flow: propagate the non-null value.
      var operation = this._currentOperation;
      this._canvasObservers.forEach((observer) => {
        observer.addOperation(operation);
      });
      this._currentOperation = null;
    }
  }

  mousedown(event: CanvasEvent): void {
    // If we're already in an operation, close the operation
    this.emitCanvasOperation();

    var loc = this._getCanvasCoords(event.x, event.y);
    this.startPath(loc);
    this._currentOperation = {
      beginLocation: loc,
      locations: [],
    };
  }

  mousemove(event: CanvasEvent): void {
    var operation = this._currentOperation;
    if (operation != null) {
      var loc = this._getCanvasCoords(event.x, event.y);
      this.continuePath(loc);
      operation.locations.push(loc);
    }
  }

  mouseup(event: CanvasEvent): void {
    if (this._currentOperation != null) {
      this.mousemove(event);
      this.emitCanvasOperation();
    }
  }
}

module.exports = {CanvasPainting};
