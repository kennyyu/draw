'use babel';
/* @flow */

var {CanvasObserver} = require('./CanvasObserver.js')
var {CanvasLocation, CanvasOperation} = require('./CanvasOperation.js')

class CanvasPainting {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  currentOperation: ?CanvasOperation;
  canvasObservers: Array<CanvasObserver>;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    var context = canvas.getContext('2d');
    // This runtime check is needed for flow
    if (!(context instanceof CanvasRenderingContext2D)) {
      throw new Error('Canvas does not support 2d context');
    }
    this.context = context;
    this.currentOperation = null;
    this.canvasObservers = [];
  }

  getCanvasCoords(x: number, y: number): CanvasLocation {
    return {
      x: x - this.canvas.offsetLeft,
      y: y - this.canvas.offsetTop,
    }
  }

  init(): void {
    this.canvas.addEventListener('mousedown', this.mousedown.bind(this), false);
    this.canvas.addEventListener('mousemove', this.mousemove.bind(this), false);
    this.canvas.addEventListener('mouseup', this.mouseup.bind(this), false);
    this.context.strokeStyle = '#000000';
    this.context.lineWidth = 5;
    this.context.lineJoin = 'round';
  }

  addObserver(observer: CanvasObserver): void {
    this.canvasObservers.push(observer);
  }

  startPath(loc: CanvasLocation): void {
    this.context.beginPath();
    this.context.moveTo(loc.x, loc.y);
  }

  continuePath(loc: CanvasLocation): void {
    this.context.lineTo(loc.x, loc.y);
    this.context.stroke();
  }

  replayCanvasOperation(operation: CanvasOperation): void {
    this.startPath(operation.beginLocation);
    operation.locations.forEach(this.continuePath);
  }

  emitCanvasOperation(): void {
    if (this.currentOperation != null) {
      // Flow: propagate the non-null value.
      var operation = this.currentOperation;
      this.canvasObservers.forEach((observer) => {
        observer.addOperation(operation);
      });
      this.currentOperation = null;
    }
  }

  mousedown(event: CanvasEvent): void {
    // If we're already in an operation, close the operation
    this.emitCanvasOperation();

    var loc = this.getCanvasCoords(event.x, event.y);
    this.startPath(loc);
    this.currentOperation = {
      beginLocation: loc,
      locations: [],
    };
  }

  mousemove(event: CanvasEvent): void {
    var operation = this.currentOperation;
    if (operation != null) {
      var loc = this.getCanvasCoords(event.x, event.y);
      this.continuePath(loc);
      operation.locations.push(loc);
    }
  }

  mouseup(event: CanvasEvent): void {
    if (this.currentOperation != null) {
      this.mousemove(event);
      this.emitCanvasOperation();
    }
  }
}

module.exports = {CanvasPainting};
