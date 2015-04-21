'use babel';
/* @flow */

var React = require('react');
var StyleSheet = require('react-style');

var {CanvasSidebar} = require('../components/CanvasSidebar.js');
var {CanvasContainer} = require('../components/CanvasContainer.js');

var CanvasApp = React.createClass({

  propTypes: {
    windowWidth: React.PropTypes.number.isRequired,
    windowHeight: React.PropTypes.number.isRequired,
  },

  render: function(): any {
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
        backgroundColor: '#AAAAAA',
        width: sidebarWidth + 'px',
        height: this.props.windowHeight + 'px',
      }
    });

    return (
      <div>
        <div style={styles.container}>
          <CanvasContainer
            canvasWidth={canvasWidth}
            canvasHeight={this.props.windowHeight}
          />
        </div>
        <div style={styles.sidebar}>
          <CanvasSidebar />
        </div>
      </div>
    );
  }
});

module.exports = {CanvasApp};
