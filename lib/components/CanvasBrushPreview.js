'use babel';
/* @flow */

import jQuery from 'jquery';
import React from 'react';

class CanvasBrushPreview extends React.Component {
  state: {};

  constructor(props: any) {
    super(props);
    this.state = {};
  }

  componentWillUpdate(nextProps: any, nextState: any): void {
    this._drawBrushPreview(nextProps);
  }

  componentDidMount(): void {
    var canvas = React.findDOMNode(this.refs.canvas);
    canvas.width = this.props.maxBrushSize;
    canvas.height = this.props.maxBrushSize;
    this._drawBrushPreview(this.props);
  }

  _drawBrushPreview(props: any): void {
    var canvas = React.findDOMNode(this.refs.canvas);
    var context = canvas.getContext('2d');
    // This runtime check is needed for flow
    if (!(context instanceof CanvasRenderingContext2D)) {
      throw new Error('Canvas does not support 2d context');
    }
    // Clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Now draw a circle to represent the brush
    context.strokeStyle = props.brushColor;
    context.fillStyle = props.brushColor;
    context.beginPath();
    context.arc(
        canvas.width / 2,
        canvas.height / 2,
        props.brushSize / 2,
        0,
        Math.PI * 2);
    context.closePath();
    context.fill();
  }

  render(): any {
    return (
      <div style={{width: '100%', height: this.props.maxBrushSize + 'px'}} ref='container'>
        <center>
          <canvas ref='canvas' />
        </center>
      </div>
    );
  }
}

CanvasBrushPreview.propTypes = {
  maxBrushSize: React.PropTypes.number,
  brushSize: React.PropTypes.number,
  brushColor: React.PropTypes.string,
};

export default CanvasBrushPreview;
