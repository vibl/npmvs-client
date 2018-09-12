import React, {Component} from 'react';
import {connect} from 'react-redux';
import Slider from '@material-ui/lab/Slider';
import styled from 'react-emotion';
import state from '../../logic/store';
import {apply, join, map, pipe} from 'ramda';
const {hsl, rangeStep} = require('../../logic/vibl-pure');

const SlidersContainer = styled.div`
    flex:initial;
    display:flex;
    height: 100px;
    width: 100px;
`;
const makeGradient = fn => pipe(
  map(fn),
  map(apply(hsl)),
  join(', '),
);
const gradientFn = {
  hue: p => makeGradient(h => [h, p.saturation, p.lightness])(rangeStep(60, 0, 360)),
  saturation: p => makeGradient(s => [p.hue, s, p.lightness])([0, 100]),
  lightness: p => makeGradient(l => [p.hue, p.saturation, l])([0, 50, 100]),
};
const GradientSlider = styled(Slider)`
    background: linear-gradient(to bottom, ${p => {/*debugger;*/ return gradientFn[p.id](p)}});
`;
class ColorSlider extends Component {
  handleChange = (event, value) => {
    state.set({color:{[this.props.id]: value} });
  };
  render() {
    const {id, color, label, max} = this.props;
    const value = color[id];
    return (
      <GradientSlider
        value={value}
        aria-labelledby={label}
        onChange={this.handleChange.bind(this)}
        vertical
        min={0}
        max={max}
        {...{...color, id}}
      />
    );
  }
}
const sliders = [
  {
    id: 'hue',
    label: 'Hue',
    max: 360,
    step: 5,
  },
  {
    id: 'saturation',
    label: 'Saturation',
    max: 100,
    step: 5,

  },
  {
    id: 'lightness',
    label: 'Lightness',
    max: 100,
    step: 5,
  },
];
const ColorSliders = (props) => {
  return (
    <SlidersContainer>
      { sliders.map( slider => <ColorSlider key={slider.id} {...slider} {...props}/>)}
    </SlidersContainer>
  );
};
const mapStateToProps = (state) => ({
    color: state.color,
  }
);
export default connect(mapStateToProps)(ColorSliders);