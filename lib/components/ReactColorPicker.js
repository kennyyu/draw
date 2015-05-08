'use babel';
/* @flow */

import ColorPicker from 'color-picker';
import jQuery from 'jquery';
import React from 'react';
import StyleSheet from 'react-style';

class ReactColorPicker extends React.Component {
  state: {};

  constructor(props: any) {
    super(props);
    this.state = {};
  }

  componentDidMount(): void {
    var container = React.findDOMNode(this.refs.container);
    var picker = this._newColorPicker(this.props.color);
    picker.el.appendTo(container);
    var dimension = Math.floor(jQuery(container).width() * 0.85);
    picker.width(dimension);
    picker.height(dimension);
    picker.color(this.props.color);
    picker.render();
    picker.on('change', (color) => {
      this.props.onColorChange(color.toString());
    });
  }

  // HACK: The color-picker library does not offer a constructor to set
  // the initial color value, so we duplicate the constructor here with
  // a color parameter.
  _newColorPicker(color: string): ColorPicker {
    var picker = new ColorPicker();
    picker._colorPos = {};
    picker.el = jQuery(require('color-picker/template'));
    picker.main = picker.el.find('.main').get(0);
    picker.spectrum = picker.el.find('.spectrum').get(0);
    picker.hue(color);
    picker.spectrumEvents();
    picker.mainEvents();
    picker.w = 180;
    picker.h = 180;
    picker.render();
    return picker;
  }

  render(): any {
    return (
      <div style={{width: '100%', margin: '0 auto 0 auto'}} ref='container'/>
    );
  }
}

ReactColorPicker.propTypes = {
  onColorChange: React.PropTypes.func,
  color: React.PropTypes.string,
};

ReactColorPicker.defaultProps = {
  onColorChange: function() {},
  color: '#000000',
};

export default ReactColorPicker;
