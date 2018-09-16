import React, {Component} from 'react';
import styled from 'react-emotion';
import store from '../../logic/store';
import PopSlider from "../card/PopSlider";
// import { Fade, Loop } from 'react-animation-components';

const StyledSpan = styled.span`
    span.popslider.value {
      padding: 0.2rem;
      box-shadow: inset 0 0 6px 0 #d0b6bd, 0 0 6px 0 #d0b6bd;
      transition: box-shadow 1s;
    }
`;
export default ({value, displayValue, sliderConfig, onChange}) => {
  const selector = 'span.popslider.value';
  const rule = 'box-shadow: inset 0 0 2px 0 #ffffff, 0 0 2px 0 #ffffff !important;';
  const interval = 1000;
  store.set({blinker: {[selector]: {rule, interval}}});
  return (
    <StyledSpan>
      <PopSlider {...sliderConfig} {...{value, onChange}}>
        {/*<Loop in interval={700}>*/}
          {/*<Fade*/}
            {/*enterOpacity={1}*/}
            {/*exitOpacity={0.4}*/}
            {/*style={{display: 'inline'}}*/}
            {/*timingFn="ease-out"*/}
          {/*>*/}
            {displayValue}
          {/*</Fade>*/}
        {/*</Loop>*/}
      </PopSlider>
    </StyledSpan>
)} ;
