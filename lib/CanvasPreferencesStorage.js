'use babel';
/* @flow */

var {CanvasPainting} = require('./CanvasPainting.js');
var {CanvasPreferences} = require('./CanvasPreferences.js');
var {CanvasLocalStorage} = require('./CanvasLocalStorage.js');

var STORAGE_KEY = 'canvas_preferences_storage_key';
var DEFAULT_VALUE = {
  brushSize: 5,
  brushColor: '#000000',
};

class CanvasPreferencesStorage
    extends CanvasLocalStorage<CanvasPreferences> {
  constructor() {
    super(STORAGE_KEY, DEFAULT_VALUE);
  }

  init(painting: CanvasPainting): void {
    var preferences = super.getAll();
    painting.setCanvasPreferences(preferences);
  }
}

module.exports = {CanvasPreferencesStorage};
