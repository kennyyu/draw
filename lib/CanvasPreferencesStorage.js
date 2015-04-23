'use babel';
/* @flow */

var {CanvasPreferences} = require('./CanvasPreferences.js');
var {CanvasStorage} = require('./CanvasStorage.js');

var STORAGE_KEY = 'canvas_preferences_storage_key';
var DEFAULT_VALUE = {
  brushSize: 5,
  brushColor: '#000000',
};

class CanvasPreferencesStorage extends CanvasStorage<CanvasPreferences> {
  constructor() {
    super(STORAGE_KEY, DEFAULT_VALUE);
  }
}

module.exports = {CanvasPreferencesStorage};
