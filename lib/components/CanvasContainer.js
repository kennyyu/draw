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

  componentWillReceiveProps(nextProps: any): void {
    if (this.props.canvasID != nextProps.canvasID) {
      this.updateCanvas(nextProps);
      return;
    }
    var painting = this.state.painting;
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

  updateCanvas(props): void {
    // Remove all listeners hack.
    // See: http://stackoverflow.com/questions/19469881/javascript-remove-all-event-listeners-of-specific-type
    var canvas = React.findDOMNode(this.refs.canvas);
    var canvasClone = canvas.cloneNode(true);
    canvas.parentNode.replaceChild(canvasClone, canvas);
    canvas = canvasClone;

    // This runtime check is needed for Flow
    if (!(canvas instanceof HTMLCanvasElement)) {
      throw new Error('Expected canvas element');
    }
    canvas.width = props.canvasWidth;
    canvas.height = props.canvasHeight;

    // Initialize the canvas event handlers and observers
    var painting = new CanvasPainting(
        canvas,
        props.appState.operationsObservers,
        props.appState.preferencesObservers);
    painting.init();

    // Replay any existing operations
    props.appState.operationsStorage.init(painting);

    // Reset brush preferences
    props.appState.preferencesStorage.init(painting);

    this.setState({
      painting: painting,
    });
    this.forceUpdate();
  }

  componentDidMount(): void {
    this.updateCanvas(this.props);
  }

  render(): any {
    return (
      <canvas
        style={{cursor: 'url(static/img/brush.png) 0 29, auto'}}
        ref='canvas'
      />
    );
  }
}

CanvasContainer.propTypes = {
  appState: React.PropTypes.object,
  brushSize: React.PropTypes.number,
  brushColor: React.PropTypes.string,
  canvasWidth: React.PropTypes.number.isRequired,
  canvasHeight: React.PropTypes.number.isRequired,
  canvasID: React.PropTypes.string,
  clearCanvas: React.PropTypes.number,
};

module.exports = {CanvasContainer};
