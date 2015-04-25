declare class TouchCoords {
  pageX: number;
  pageY: number;
}

declare class CanvasEvent extends Event {
  x: number;
  y: number;
  changedTouches: ?Array<TouchCoords>;
}