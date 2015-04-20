'use babel';
/* @flow */

class CanvasPainting {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  enabled: bool;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    var context = canvas.getContext('2d');
    // This runtime check is needed for flow
    if (!(context instanceof CanvasRenderingContext2D)) {
      throw new Error('Canvas does not support 2d context');
    }
    this.context = context;
    this.enabled = false;
  }

  getCanvasCoords(x: number, y: number): [number, number] {
    return [x - this.canvas.offsetLeft, y - this.canvas.offsetTop];
  }

  init(): void {
    this.canvas.addEventListener('mousedown', this.mousedown.bind(this), false);
    this.canvas.addEventListener('mousemove', this.mousemove.bind(this), false);
    this.canvas.addEventListener('mouseup', this.mouseup.bind(this), false);
    this.context.strokeStyle = '#000000';
    this.context.lineWidth = 5;
    this.context.lineJoin = 'round';
  }

  mousedown(event: CanvasEvent): void {
    var [x, y] = this.getCanvasCoords(event.x, event.y);
    this.context.beginPath();
    this.context.moveTo(x, y);
    this.enabled = true;
  }

  mousemove(event: CanvasEvent): void {
    if (this.enabled) {
      var [x, y] = this.getCanvasCoords(event.x, event.y);
      this.context.lineTo(x, y);
      this.context.stroke();
    }
  }

  mouseup(event: CanvasEvent): void {
    if (this.enabled) {
      var [x, y] = this.getCanvasCoords(event.x, event.y);
      this.mousemove(event);
      this.enabled = false;
    }
  }
}

module.exports = {CanvasPainting};