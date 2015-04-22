'use babel';
/* @flow */

var React = require('react');
var {Button, Panel} = require('react-bootstrap');
var StyleSheet = require('react-style');
var Slider = require('../components/Slider.js');

class CanvasSidebar extends React.Component {
  render(): any {
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
              value={5}
              toolTip={true}
              onSlide={this.onBrushSizeChange.bind(this)}
            />
          </Panel>
          <Panel header={<h3>Choose Brush Color</h3>}>
            Brush Color
          </Panel>
        </Panel>
      </div>
    );
  }

  onBrushSizeChange(size: number): void {
    console.log(size);
  }
}

var styles = StyleSheet.create({
  wrapper: {
    padding: '5px',
    margin: '0px',
    height: '100%',
  },
});

module.exports = {CanvasSidebar};
