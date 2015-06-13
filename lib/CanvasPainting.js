'use babel';
/* @flow */

import CanvasObserver from './CanvasObserver.js';
import {
  CanvasLocation,
  CanvasOperation,
  CanvasPendingOperation,
} from './CanvasOperation.js';
import CanvasPreferences from './CanvasPreferences.js';

class CanvasPainting {
  _canvas: HTMLCanvasElement;
  _context: CanvasRenderingContext2D;
  _currentOperation: ?CanvasOperation;
  _isDrawing: bool;
  _operationsObservers: Array<CanvasObserver<CanvasPendingOperation>>;
  _preferencesObservers: Array<CanvasObserver<CanvasPreferences>>;

  constructor(
      canvas: HTMLCanvasElement,
      operationsObservers: Array<CanvasObserver<CanvasPendingOperation>>,
      preferencesObservers: Array<CanvasObserver<CanvasPreferences>>
  ) {
    this._canvas = canvas;
    var context = canvas.getContext('2d');
    // This runtime check is needed for flow
    if (!(context instanceof CanvasRenderingContext2D)) {
      throw new Error('Canvas does not support 2d context');
    }
    this._context = context;
    this._currentOperation = null;
    this._isDrawing = false;
    this._operationsObservers = operationsObservers;
    this._preferencesObservers = preferencesObservers;
  }

  init(): void {
    this._canvas.addEventListener(
        'mousedown', this.mousedown.bind(this), false);
    this._canvas.addEventListener(
        'mousemove', this.mousemove.bind(this), false);
    this._canvas.addEventListener(
        'mouseup', this.mouseup.bind(this), false);
    this._canvas.addEventListener(
        'touchstart', this.mousedown.bind(this), false);
    this._canvas.addEventListener(
        'touchmove', this.mousemove.bind(this), false);
    this._canvas.addEventListener(
        'touchend', this.mouseup.bind(this), false);
    this._canvas.addEventListener(
        'touchleave', this.mouseup.bind(this), false);
    this._context.strokeStyle = '#000000';
    this._context.fillStyle = '#000000';
    this._context.lineWidth = 5;
    this._context.lineJoin = 'round';
    this._context.lineCap = 'round';
  }

  setCanvasPreferences(preferences: CanvasPreferences): void {
    this.setBrushSize(preferences.brushSize);
    this.setBrushColor(preferences.brushColor);
    this.emitCanvasPreferences();
  }

  getBrushSize(): number {
    return this._context.lineWidth;
  }

  setBrushSize(size: number): void {
    this._context.lineWidth = size;
  }

  getBrushColor(): string {
    var color = this._context.strokeStyle;
    // This runtime check is needed for flow
    if (!(typeof color == 'string')) {
      throw new Error('expected strokeStyle to be string');
    }
    return color;
  }

  setBrushColor(color: string): void {
    this._context.strokeStyle = color;
    this._context.fillStyle = color;
  }

  emitCanvasPreferences(): void {
    var preferences = {
      brushSize: this.getBrushSize(),
      brushColor: this.getBrushColor(),
    };
    this._preferencesObservers.map((observer) => {
      observer.observe(preferences);
    });
  }

  _getCanvasCoords(event: CanvasEvent): CanvasLocation {
    var changedTouches = event.changedTouches;
    if (changedTouches != null && changedTouches.length > 0) {
      event.preventDefault();
      var x = changedTouches[0].pageX;
      var y = changedTouches[0].pageY;
    } else {
      x = event.x;
      y = event.y;
    }
    return {
      x: x - this._canvas.offsetLeft,
      y: y - this._canvas.offsetTop,
    };
  }

  startPath(loc: CanvasLocation): void {
    this._context.beginPath();
    this._context.arc(
        loc.x, loc.y, this.getBrushSize() / 2, 0, Math.PI * 2);
    this._context.closePath();
    this._context.fill();
  }

  continuePath(prevLoc: CanvasLocation, loc: CanvasLocation): void {
    this._context.beginPath();
    this._context.moveTo(prevLoc.x, prevLoc.y);
    this._context.lineTo(loc.x, loc.y);
    this._context.stroke();
  }

  replayCanvasOperation(operation: CanvasOperation): void {
    var oldBrushSize = this.getBrushSize();
    this.setBrushSize(operation.brushSize);
    var oldBrushColor = this.getBrushColor();
    this.setBrushColor(operation.brushColor);

    this.startPath(operation.beginLocation);
    var prevLoc = operation.beginLocation;
    for (var i = 0; i < operation.locations.length; i++) {
      var currentLoc = operation.locations[i];
      this.continuePath(prevLoc, currentLoc);
      prevLoc = currentLoc;
    }

    this.setBrushSize(oldBrushSize);
    this.setBrushColor(oldBrushColor);
  }

  getCanvasURL(): string {
    return this._canvas.toDataURL();
  }

  getCanvasWidth(): number {
    return this._canvas.width;
  }

  getCanvasHeight(): number {
    return this._canvas.height;
  }

  setCanvas(canvasURL: string, done: () => void): void {
    var painting = this;
    var image = new Image();
    image.src = canvasURL;
    image.onload = () => {
      painting._context.drawImage(
          image, 0, 0, painting._canvas.width, painting._canvas.height);
      done();
    };
  }

  clearCanvas(): void {
    this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);
    this._operationsObservers.map((observer) => {
      observer.clear();
    });
  }

  emitCanvasOperation(): void {
    var currentOperation = this._currentOperation;
    if (currentOperation != null) {
      // Flow: propagate the non-null value.
      var operation = {
        operation: currentOperation,
        baseCanvas: this.getCanvasURL(),
      };
      this._operationsObservers.map((observer) => {
        observer.observe(operation);
      });
      this._currentOperation = null;
    }
  }

  _startCanvasOperation(event: CanvasEvent): void {
    var loc = this._getCanvasCoords(event);
    this.startPath(loc);
    this._currentOperation = {
      beginLocation: loc,
      locations: [],
      brushSize: this.getBrushSize(),
      brushColor: this.getBrushColor(),
    };
  }

  mousedown(event: CanvasEvent): void {
    this._isDrawing = true;
    // If we're already in an operation, close the operation
    this.emitCanvasOperation();
    this._startCanvasOperation(event);
  }

  mousemove(event: CanvasEvent): void {
    if (this._isDrawing) {
      var operation = this._currentOperation;
      if (operation != null) {
        var loc = this._getCanvasCoords(event);
        var prevLoc = operation.locations.length == 0 ? operation.beginLocation :
            operation.locations[operation.locations.length - 1];
        this.continuePath(prevLoc, loc);
        operation.locations.push(loc);
        this.emitCanvasOperation();
        this._startCanvasOperation(event);
      }
    }
  }

  mouseup(event: CanvasEvent): void {
    if (this._currentOperation != null) {
      this.mousemove(event);
    }
    this._isDrawing = false;
  }
}

export default CanvasPainting;
