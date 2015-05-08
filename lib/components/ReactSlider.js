'use babel';
/* @flow */

import BootstrapSlider from 'bootstrap-slider';
import React from 'react';

type ReactSliderState = {
  slider: ?BootstrapSlider;
};

class ReactSlider extends React.Component {
  state: ReactSliderState;

  constructor(props: any) {
    super(props);
    this.state = {slider: null};
  }

  componentWillUpdate(nextProps: any, nextState: any): void {
    var slider = nextState.slider;
    if (slider != null) {
      slider.setValue(nextProps.value);
    }
  }

  componentDidMount(): void {
    var toolTip = this.props.toolTip ? 'show' : 'hide';
    var slider = new BootstrapSlider(React.findDOMNode(this.refs.container), {
      id: this.props.id,
      min: this.props.min,
      max: this.props.max,
      step: this.props.step,
      value: this.props.value,
      tooltip: toolTip
    });

    slider.on('slide', (event) => {
      this.props.onSlide(event);
      slider.setValue(event);
    });
    slider.on('change', (event) => {
      this.props.onSlide(event.newValue);
      slider.setValue(event.newValue);
    });

    this.setState({
      slider: slider
    });
  }

  render(): any {
    return (
      <div style={{width: "100%"}} ref='container'/>
    );
  }
}

ReactSlider.propTypes = {
  id: React.PropTypes.string,
  min: React.PropTypes.number,
  max: React.PropTypes.number,
  step: React.PropTypes.number,
  value: React.PropTypes.number.isRequired,
  toolTip: React.PropTypes.bool,
  onSlide: React.PropTypes.func
};

ReactSlider.defaultProps = {
  min: 0,
  max: 100,
  step: 1,
  value: 50,
  toolTip: false,
  onSlide: function() {}
};

export default ReactSlider;
