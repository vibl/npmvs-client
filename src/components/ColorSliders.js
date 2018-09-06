import React, {Component} from 'react';
import {connect} from 'react-redux';
import Slider from '@material-ui/lab/Slider';
import styled from 'react-emotion';
import state from '../logic/store';

const SlidersContainer = styled.div`
     display:flex;
    height: 100px;
    width: 0;
`;
class ColorSlider extends Component {
  constructor(props) {
    super(props);
  }
  handleChange = (event, value) => {
    state.set({color:{[this.props.id]: value} });
  };
  render() {
    const {value, label, max} = this.props;
    return (
      <Slider
        value={value}
        aria-labelledby={label}
        onChange={this.handleChange.bind(this)}
        vertical
        min={0}
        max={max}
      />
    );
  }
}
class LightnessSlider extends Component {
  handleChange = (event, value) => {
    state.set({color:{lightness: value} });
  };
  render() {
    return (
      <Slider
        value={this.props.lightness}
        aria-labelledby="Lightness slider"
        onChange={this.handleChange.bind(this)}
        vertical
        min={0}
        max={100}
      />
    );
  }
}
const ColorSliders = ({color}) => {
  const sliders = [
    {
      id: 'hueOffset',
      label: 'Hue slider',
      max: 360,
    },
    {
      id: 'saturation',
      label: 'Saturation slider',
      max: 100,
    },
    {
      id: 'lightness',
      label: 'Lightness slider',
      max: 100,
    },
  ];
  return (
    <SlidersContainer>
      { sliders.map( props => <ColorSlider {...props} value={color[props.id]}/>)}
    </SlidersContainer>
  );
};
const mapStateToProps = (state) => ({
    color: state.color,
  }
);
export default connect(mapStateToProps)(ColorSliders);