'use babel';
/* @flow */

var React = require('react');
var StyleSheet = require('react-style');

var {CanvasObserver} = require('../CanvasObserver.js');
var {CanvasPainting} = require('../CanvasPainting.js');
var {CanvasStorage} = require('../CanvasStorage.js');
var {CanvasStorageObserver} = require('../CanvasStorageObserver.js');

var CanvasContainer = React.createClass({

  propTypes: {
    canvasWidth: React.PropTypes.number.isRequired,
    canvasHeight: React.PropTypes.number.isRequired,
  },

  componentDidMount: function(): void {
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
  },

  render: function(): any {
    return (
      <canvas ref='canvas'></canvas>
    );
  }
});

module.exports = {CanvasContainer};
