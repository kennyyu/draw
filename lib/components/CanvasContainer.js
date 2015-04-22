'use babel';
/* @flow */

var React = require('react');
var StyleSheet = require('react-style');

var {CanvasObserver} = require('../CanvasObserver.js');
var {CanvasPainting} = require('../CanvasPainting.js');
var {CanvasStorage} = require('../CanvasStorage.js');
var {CanvasStorageObserver} = require('../CanvasStorageObserver.js');

class CanvasContainer extends React.Component {

  componentDidMount(): void {
    var canvas = React.findDOMNode(this.refs.canvas);
    // This runtime check is needed for Flow
    if (!(canvas instanceof HTMLCanvasElement)) {
      throw new Error('Expected canvas element');
    }
    canvas.width = this.props.canvasWidth;
    canvas.height = this.props.canvasHeight;

    // Initialize the canvas event handlers and observers
    var storage = new CanvasStorage();
    var observer: CanvasObserver = new CanvasStorageObserver(storage);
    var painting = new CanvasPainting(canvas, [observer]);
    painting.init();

    // Replay any existing operations
    var operations = storage.getAll();
    operations.map(painting.replayCanvasOperation.bind(painting));
  }

  render(): any {
    return (
      <canvas ref='canvas'></canvas>
    );
  }
}
CanvasContainer.propTypes = {
  canvasWidth: React.PropTypes.number.isRequired,
  canvasHeight: React.PropTypes.number.isRequired,
};

module.exports = {CanvasContainer};
