'use babel';
/* @flow */

import React from 'react';
import Router from 'react-router';
import StyleSheet from 'react-style';

import CanvasContainer from '../components/CanvasContainer.js';
import CanvasSidebar from '../components/CanvasSidebar.js';
import CanvasFirebaseOperationsStorage
    from '../CanvasFirebaseOperationsStorage.js';
import CanvasFirebaseOperationsObserver
    from '../CanvasFirebaseOperationsObserver.js';
import CanvasObserver from '../CanvasObserver.js';
import {CanvasOperation, CanvasPendingOperation} from '../CanvasOperation.js';
import CanvasPreferences from '../CanvasPreferences.js';
import CanvasPreferencesObserver from '../CanvasPreferencesObserver.js';
import CanvasPreferencesStorage from '../CanvasPreferencesStorage.js';
import CanvasStorage from '../CanvasStorage.js';

type AppState = {
//  operationsStorage: CanvasStorage<Array<CanvasOperation>>;
//  operationsObservers: Array<CanvasObserver<CanvasPendingOperation>>;
//  preferencesStorage: CanvasStorage<CanvasPreferences>;
//  preferencesObservers: Array<CanvasObserver<CanvasPreferences>>;
  operationsStorage: any;
  operationsObservers: Array<CanvasObserver<CanvasPendingOperation>>;
  preferencesStorage: any;
  preferencesObservers: Array<CanvasObserver<CanvasPreferences>>;
}

type CanvasAppState = {
  appState: AppState;
  brushSize: number;
  brushColor: string;
  clearCanvas: number;
};

class CanvasApp extends React.Component {
  state: CanvasAppState;

  constructor(props: any) {
    super(props);
    this.state = this.getNewState(props);
  }

  getNewState(props: any): CanvasAppState {
    // Initialize all our app singletons
    var firebaseOperationsStorage = new CanvasFirebaseOperationsStorage(
        props.firebaseURL, props.params.canvasid);
    var firebaseOperationsObserver: CanvasObserver<CanvasPendingOperation> =
        new CanvasFirebaseOperationsObserver(firebaseOperationsStorage);
    var preferencesStorage = new CanvasPreferencesStorage();
    var preferencesObserver: CanvasObserver<CanvasPreferences> =
        new CanvasPreferencesObserver(preferencesStorage);
    var appState = {
      operationsStorage: firebaseOperationsStorage,
      operationsObservers: [firebaseOperationsObserver],
      preferencesStorage: preferencesStorage,
      preferencesObservers: [preferencesObserver],
    };

    var preferences = appState.preferencesStorage.getAll();
    return {
      appState: appState,
      brushSize: preferences.brushSize,
      brushColor: preferences.brushColor,
      clearCanvas: 0, // HACK: see onClearCanvas
    };
  }

  componentWillReceiveProps(nextProps: any): void {
    if (this.props.params.canvasid != nextProps.params.canvasid) {
      this.setState(this.getNewState(nextProps));
    }
  }

  render(): any {
    var canvasWidth = Math.floor(0.75 * this.props.windowWidth);
    var sidebarWidth = this.props.windowWidth - canvasWidth;
    var styles = StyleSheet.create({
      container: {
        padding: '0px',
        margin: '0px',
        float: 'left',
        backgroundColor: '#FFFFFF',
        width: canvasWidth + 'px',
        height: this.props.windowHeight + 'px',
      },
      sidebar: {
        padding: '0px',
        margin: '0px',
        float: 'left',
        backgroundColor: '#FFFFFF',
        width: sidebarWidth + 'px',
        height: this.props.windowHeight + 'px',
      }
    });

    return (
      <div>
        <div style={styles.container}>
          <CanvasContainer
            appState={this.state.appState}
            brushSize={this.state.brushSize}
            brushColor={this.state.brushColor}
            clearCanvas={this.state.clearCanvas}
            canvasWidth={canvasWidth}
            canvasHeight={this.props.windowHeight}
            canvasID={this.props.params.canvasid}
          />
        </div>
        <div style={styles.sidebar}>
          <CanvasSidebar
            brushSize={this.state.brushSize}
            brushColor={this.state.brushColor}
            onBrushSizeChange={this.onBrushSizeChange.bind(this)}
            onBrushColorChange={this.onBrushColorChange.bind(this)}
            onClearCanvas={this.onClearCanvas.bind(this)}
            onNewCanvas={this.onNewCanvas.bind(this)}
            onGoToCanvas={this.onGoToCanvas.bind(this)}
            canvasID={this.props.params.canvasid}
          />
        </div>
      </div>
    );
  }

  onNewCanvas(): void {
    this.context.router.transitionTo('/d');
  }

  onGoToCanvas(canvasID: string): void {
    this.context.router.transitionTo('/d/' + canvasID);
  }

  onClearCanvas(): void {
    // TODO: this is hack to get clearCanvas to work.
    // Fix this when we use flux to properly send events
    // between components.
    this.setState((state, props) => ({
      brushSize: state.brushSize,
      brushColor: state.brushColor,
      clearCanvas: state.clearCanvas + 1,
    }));
  }

  onBrushSizeChange(size: number): void {
    this.setState((state, props) => ({
      brushSize: size,
      brushColor: state.brushColor,
      clearCanvas: state.clearCanvas,
    }));
  }

  onBrushColorChange(color: string): void {
    this.setState((state, props) => ({
      brushSize: state.brushSize,
      brushColor: color,
      clearCanvas: state.clearCanvas,
    }));
  }
}

CanvasApp.propTypes = {
  firebaseURL: React.PropTypes.string.isRequired,
  windowWidth: React.PropTypes.number.isRequired,
  windowHeight: React.PropTypes.number.isRequired,
};

CanvasApp.contextTypes = {
  router: React.PropTypes.func,
};

export default CanvasApp;
