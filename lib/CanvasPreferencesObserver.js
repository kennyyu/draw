'use babel';
/* @flow */

import CanvasObserver from './CanvasObserver.js';
import CanvasPreferences from './CanvasPreferences.js';
import CanvasPreferencesStorage from './CanvasPreferencesStorage.js';

class CanvasPreferencesObserver extends CanvasObserver<CanvasPreferences> {
  _preferences: CanvasPreferences;
  _storage: CanvasPreferencesStorage;

  constructor(storage: CanvasPreferencesStorage) {
    super();
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

export default CanvasPreferencesObserver;
