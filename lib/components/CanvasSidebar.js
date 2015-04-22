'use babel';
/* @flow */

var Colr = require('colr');
var React = require('react');
var {Button, Panel} = require('react-bootstrap');
var StyleSheet = require('react-style');
var ColorPicker = require('react-colorpicker');
//var ColorPicker = require('react-color-picker');
var Slider = require('../components/Slider.js');

// Can't use ES6 classes for React 0.13 yet.
// See: https://gist.github.com/sebmarkbage/ef0bf1f338a7182b6775
class CanvasSidebar extends React.Component {

//  getInitialState: function() {
//    return {
//      size: 5,
//      color: '#000000',
//    };
//  },

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
    });
    console.log(this.props.brushSize);
    return (
      <div style={styles.wrapper}>
        <Panel style={styles.wrapper}>
          <Button bsSize='large' block>Clear Canvas</Button>
          <br/>
          <Panel header={<h3>Choose Brush Size</h3>}>
            <Slider
              min={1}
              max={25}
              step={1}
              value={this.props.brushSize}
              toolTip={true}
              onSlide={this.props.onBrushSizeChange}
            />
          </Panel>
          <Panel header={<h3>Choose Brush Color</h3>}>
            <div>

            </div>
          </Panel>
          <Panel header={<h3>Brush Preview</h3>}>
            <p color={this.props.brushColor}>{this.props.brushSize}</p>
          </Panel>
        </Panel>
      </div>
    );
  }

//  onBrushSizeChange: function(size: number): void {
//    this.setState((state, props) => ({size: size, color: state.color}));
//    console.log(size);
//  },

//  onBrushColorChange: function(color: Colr): void {
//    this.setState((state, props) => ({size: state.size, color: color.toHex()}));
//    console.log(color);
//  }
}
CanvasSidebar.propTypes = {
  brushSize: React.PropTypes.number,
  brushColor: React.PropTypes.string,
  onBrushSizeChange: React.PropTypes.func,
  onBrushColorChange: React.PropTypes.func,
};

module.exports = {CanvasSidebar};
