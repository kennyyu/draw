'use babel';
/* @flow */

var React = require('react');
var StyleSheet = require('react-style');
var {CanvasPainting} = require('../CanvasPainting.js');

type CanvasContainerState = {
  painting: ?CanvasPainting;
};

class CanvasContainer extends React.Component {
  state: CanvasContainerState;

  constructor(props: any) {
    super(props);
    this.state = {painting: null};
  }

  componentWillUpdate(nextProps: any, nextState: any): void {
    var painting = nextState.painting;
    if (painting != null) {
      painting.setCanvasPreferences({
        brushSize: nextProps.brushSize,
        brushColor: nextProps.brushColor,
      });

      // TODO: this is HACK to get clear canvas to work.
      if (this.props.clearCanvas < nextProps.clearCanvas) {
        painting.clearCanvas();
      }
    }
  }

  componentDidMount(): void {
    var canvas = React.findDOMNode(this.refs.canvas);
    // This runtime check is needed for Flow
    if (!(canvas instanceof HTMLCanvasElement)) {
      throw new Error('Expected canvas element');
    }
    canvas.width = this.props.canvasWidth;
    canvas.height = this.props.canvasHeight;

    // Initialize the canvas event handlers and observers
    var painting = new CanvasPainting(
        canvas,
        this.props.appState.operationsObservers,
        this.props.appState.preferencesObservers);
    painting.init();

    // Replay any existing operations
    var operations = this.props.appState.operationsStorage.getAll();
    operations.map(painting.replayCanvasOperation.bind(painting));

    // Read preferences
    var preferences = this.props.appState.preferencesStorage.getAll();
    painting.setCanvasPreferences(preferences);

    this.setState({
      painting: painting,
    });
  }

  render(): any {
    return (
      <canvas ref='canvas'></canvas>
    );
  }
}

CanvasContainer.propTypes = {
  appState: React.PropTypes.object,
  brushSize: React.PropTypes.number,
  brushColor: React.PropTypes.string,
  canvasWidth: React.PropTypes.number.isRequired,
  canvasHeight: React.PropTypes.number.isRequired,
};

module.exports = {CanvasContainer};
