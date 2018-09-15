import React, {Component} from 'react';
import PopSlider from "../card/PopSlider";
import { Fade, Loop } from 'react-animation-components';

export default ({value, displayValue, sliderConfig, onChange}) => (
  <PopSlider {...sliderConfig} {...{value, onChange}}>
    <Loop in interval={700}>
      <Fade
        enterOpacity={1}
        exitOpacity={0.4}
        style={{display: 'inline', color: '#000'}}
        timingFn="ease-out"
      >
        {displayValue}
      </Fade>
    </Loop>
  </PopSlider>
);
