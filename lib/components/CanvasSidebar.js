'use babel';
/* @flow */

import React from 'react';
import {Button, ButtonGroup, Panel, Input} from 'react-bootstrap';
import StyleSheet from 'react-style';
import CanvasBrushPreview from '../components/CanvasBrushPreview';
import ReactColorPicker from '../components/ReactColorPicker.js';
import ReactSlider from '../components/ReactSlider.js';

class CanvasSidebar extends React.Component {
  state: {
    tempCanvasName: string;
  };

  constructor(props: any) {
    super(props);
    this.state = {
      tempCanvasName: this.props.canvasID,
    };
  }

  componentWillReceiveProps(nextProps: any): void {
    if (this.state.tempCanvasName != nextProps.canvasID) {
      this.setState({
        tempCanvasName: nextProps.canvasID,
      });
    }
  }

  handleCanvasChange(): void {
    var canvasID = this.refs.currentCanvasInput.getValue();
    this.setState({
      tempCanvasName: canvasID,
    });
  }

  handleCanvasSubmit(): void {
    var canvasID = this.refs.currentCanvasInput.getValue();
    this.props.onGoToCanvas(canvasID);
  }

  handleFormSubmit(event: any): void {
    event.preventDefault();
    this.handleCanvasSubmit();
  }

  render(): any {
    var styles = StyleSheet.create({
      wrapper: {
        padding: '5px',
        margin: '0px',
      },
      text: {
        textAlign: 'center',
      }
    });
    var maxBrushSize = 100;
    return (
      <div style={styles.wrapper}>
        <Panel style={styles.wrapper}>
          <ButtonGroup justified>
            <ButtonGroup>
              <Button
                bsStyle='danger'
                bsSize='large'
                onClick={this.props.onClearCanvas}
              >
                Clear Canvas
              </Button>
            </ButtonGroup>
            <ButtonGroup>
              <Button
                bsStyle='success'
                bsSize='large'
                onClick={this.props.onNewCanvas}
              >
                New Canvas
              </Button>
            </ButtonGroup>
          </ButtonGroup>
          <br/>
          <form onSubmit={this.handleFormSubmit.bind(this)}>
            <Input
              type='text'
              value={this.state.tempCanvasName}
              ref='currentCanvasInput'
              onChange={this.handleCanvasChange.bind(this)}
              addonBefore='Name'
              buttonAfter={
                <Button onClick={this.handleCanvasSubmit.bind(this)}>
                  Go to Canvas
                </Button>
              }
            />
          </form>
          <Panel header={<h3 style={styles.text}>Choose Brush Size</h3>}>
            <ReactSlider
              min={1}
              max={maxBrushSize}
              step={1}
              value={this.props.brushSize}
              toolTip={true}
              onSlide={this.props.onBrushSizeChange}
            />
          </Panel>
          <Panel header={<h3 style={styles.text}>Choose Brush Color</h3>}>
            <ReactColorPicker
              color={this.props.brushColor}
              onColorChange={this.props.onBrushColorChange}
            />
          </Panel>
          <Panel header={<h3 style={styles.text}>Brush Preview</h3>}>
            <CanvasBrushPreview
              maxBrushSize={maxBrushSize}
              brushSize={this.props.brushSize}
              brushColor={this.props.brushColor}
            />
          </Panel>
        </Panel>
      </div>
    );
  }
}

CanvasSidebar.propTypes = {
  brushSize: React.PropTypes.number,
  brushColor: React.PropTypes.string,
  onBrushSizeChange: React.PropTypes.func,
  onBrushColorChange: React.PropTypes.func,
  onClearCanvas: React.PropTypes.func,
  onNewCanvas: React.PropTypes.func,
  onGoToCanvas: React.PropTypes.func,
  canvasID: React.PropTypes.string,
};

export default CanvasSidebar;
