'use babel';
/* @flow */

var Colr = require('colr');
var React = require('react');
var {Button, Panel} = require('react-bootstrap');
var StyleSheet = require('react-style');
var ReactColorPicker = require('../components/ReactColorPicker.js');
var ReactSlider = require('../components/ReactSlider.js');

class CanvasSidebar extends React.Component {

  constructor(props: any) {
    super(props);
    this.state = {};
  }

  render(): any {
    var styles = StyleSheet.create({
      wrapper: {
        padding: '5px',
        margin: '0px',
        height: '100%',
      },
      text: {
        textAlign: 'center',
      }
    });
    return (
      <div style={styles.wrapper}>
        <Panel style={styles.wrapper}>
          <Button
            bsSize='large'
            block
            onClick={this.props.onClearCanvas}
          >
            Clear Canvas
          </Button>
          <br/>
          <Panel header={<h3 style={styles.text}>Choose Brush Size</h3>}>
            <ReactSlider
              min={1}
              max={50}
              step={1}
              value={this.props.brushSize}
              toolTip={true}
              onSlide={this.props.onBrushSizeChange}
            />
          </Panel>
          <Panel header={<h3 style={styles.text}>Choose Brush Color</h3>}>
            <ReactColorPicker
              brushColor={this.props.brushColor}
              onColorChange={this.props.onBrushColorChange}
            />
          </Panel>
          <Panel header={<h3 style={styles.text}>Brush Preview</h3>}>
            <p style={{color: this.props.brushColor}}>{this.props.brushSize}</p>
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
};

module.exports = {CanvasSidebar};
