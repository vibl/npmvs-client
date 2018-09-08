import React, {Component} from 'react';
import {connect} from 'react-redux';
import Slider from '@material-ui/lab/Slider';
import styled from 'react-emotion';
import state from '../../logic/store';

const SlidersContainer = styled.div`
    flex:initial;
    display:flex;
    height: 100px;
    width: 100px;
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
const ColorSliders = ({color}) => {
  return (
    <SlidersContainer>
      { sliders.map( props => <ColorSlider key={props.id} {...props} value={color[props.id]}/>)}
    </SlidersContainer>
  );
};
const mapStateToProps = (state) => ({
    color: state.color,
  }
);
export default connect(mapStateToProps)(ColorSliders);