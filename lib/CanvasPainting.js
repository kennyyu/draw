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
      return;
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
  }

  mousedown(event: CanvasEvent): void {
    var [x, y] = this.getCanvasCoords(event.x, event.y);
    this.context.beginPath();
    this.context.moveTo(x, y);
    this.enabled = true;
  }

  mousemove(event: CanvasEvent): void {
    if (this.enabled) {
      var x = event.x - this.canvas.offsetLeft;
      var y = event.y - this.canvas.offsetTop;
      this.context.lineTo(x, y);
      this.context.lineJoin = 'round';
      this.context.stroke();
    }
  }

  mouseup(event: CanvasEvent): void {
    if (this.enabled) {
      var x = event.x - this.canvas.offsetLeft;
      var y = event.y - this.canvas.offsetTop;
      this.mousemove(event);
      this.enabled = false;
    }
  }
}

module.exports = {CanvasPainting};