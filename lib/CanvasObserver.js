'use babel';
/* @flow */

// Interface for observers to implement
class CanvasObserver<T> {
  observe: (value: T) => void;
  clear: () => void;
}

export default CanvasObserver;
