import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import Slider from '@material-ui/lab/Slider';
import styled from 'react-emotion';
import store from '../../data/store';
import {clearHideTimeout, hidePopupAfterTimeout} from '../util/popup-display-hide';

import {apply, join, map, pipe} from 'ramda';
const {hsl, rangeStep} = require('../../util/vibl-fp');

const StyledWrapper = styled.div`
    box-shadow: #999 0 0 0.7rem;
    display: flex;
    flex: initial;
    height: 100px;
    position: fixed;
    right: 0.2rem;
    top: 0.3rem;
    z-index: 5000;

    &.visible {
      visibility: visible;
      opacity: 1;
      transition: opacity 0.5s linear;
    }
    &.hidden {
      visibility: hidden;
      opacity: 0;
      transition: visibility 0s 1s, opacity 0.5s linear;
    }
    .slider {
      padding: 0 1rem;
    }
`;
const makeGradient = fn => pipe(
  map(fn),
  map(apply(hsl)),
  join(', '),
);
const gradientFn = {
  hue: p => makeGradient(h => [h, p.saturation, p.lightness])(rangeStep(-60, 360, 0)),
  saturation: p => makeGradient(s => [p.hue, s, p.lightness])([100, 0]),
  lightness: p => makeGradient(l => [p.hue, p.saturation, l])([100, 50, 0]),
};
const GradientSlider = styled(Slider)`
    background: linear-gradient(to bottom, ${p => {/*debugger;*/ return gradientFn[p.id](p)}});
`;
class ColorSlider extends PureComponent {
  handleChange = (event, value) => {
    store.set({[`userprefs:color:${this.props.id}`]: value});
  };
  render() {
    const {id, color, label, max} = this.props;
    const value = color[id];
    return (
      <GradientSlider
        className="slider"
        value={value}
        aria-labelledby={label}
        onChange={this.handleChange}
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
const handleMouseLeave = () => {
  hidePopupAfterTimeout('ColorDialog', 300);
};
const handleMouseEnter = () => {
  clearHideTimeout('ColorDialog');
};

const ColorDialog = (props) => {
  return (

    <StyledWrapper
      id="color-dialog"
      className={props.visible ? 'visible' : 'hidden'}
      visible={props.visible}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      { sliders.map( slider => <ColorSlider key={slider.id} {...slider} {...props}/>)}
    </StyledWrapper>
  );
};
const mapStateToProps = (state) => ({
  color: state.userprefs.color,
  visible: state.ui.displayHide.ColorDialog && state.ui.displayHide.ColorDialog.visible,
});
export default connect(mapStateToProps)(ColorDialog);