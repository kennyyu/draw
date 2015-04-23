'use babel';
/* @flow */

var React = require('react');
var StyleSheet = require('react-style');

var {CanvasSidebar} = require('../components/CanvasSidebar.js');
var {CanvasContainer} = require('../components/CanvasContainer.js');

class CanvasApp extends React.Component {

  constructor(props: any) {
    super(props);
    this.state = {
      brushSize: 5,
      brushColor: "#000000",
      clearCanvas: 0, // HACK: see onClearCanvas
    };
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
            brushSize={this.state.brushSize}
            brushColor={this.state.brushColor}
            clearCanvas={this.state.clearCanvas}
            canvasWidth={canvasWidth}
            canvasHeight={this.props.windowHeight}
          />
        </div>
        <div style={styles.sidebar}>
          <CanvasSidebar
            brushSize={this.state.brushSize}
            brushColor={this.state.brushColor}
            onBrushSizeChange={this.onBrushSizeChange.bind(this)}
            onBrushColorChange={this.onBrushColorChange.bind(this)}
            onClearCanvas={this.onClearCanvas.bind(this)}
          />
        </div>
      </div>
    );
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
    console.log(color);
  }
}
CanvasApp.propTypes = {
  windowWidth: React.PropTypes.number.isRequired,
  windowHeight: React.PropTypes.number.isRequired,
};

module.exports = {CanvasApp};
