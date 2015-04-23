'use babel';
/* @flow */

var {CanvasObserver} = require('./CanvasObserver.js');
var {CanvasPreferences} = require('./CanvasPreferences.js');
var {CanvasPreferencesStorage} = require('./CanvasPreferencesStorage.js');

class CanvasPreferencesObserver extends CanvasObserver<CanvasPreferences> {
  _preferences: CanvasPreferences;
  _storage: CanvasPreferencesStorage;

  constructor(storage: CanvasPreferencesStorage) {
    this._storage = storage;
    this._preferences = this._storage.getAll();
  }

  observe(value: CanvasPreferences): void {
    this._preferences = value;
    this._storage.put(this._preferences);
  }

  clear(): void {
    this._storage.clear();
    this._preferences = this._storage.getAll();
  }
}

module.exports = {CanvasPreferencesObserver};
