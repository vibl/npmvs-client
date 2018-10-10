import React, {PureComponent} from 'react';
import styled from 'react-emotion';
import PopSlider from "../card/PopSlider";
import {registerBlinkerTarget, disableBlinkerTarget} from '../util/Blinker';

const StyledSpan = styled.span`
    span.popslider.value {
      padding: 0.15rem 0.2rem;
      box-shadow: inset 0 0 2px 0 #802, 0 0 2px 0 #802;
      //transition: box-shadow 1s;  // Uses too much cpu.
    }
`;
class BlinkSlider extends PureComponent {
  componentDidMount() {
    registerBlinkerTarget({
      id: 'PopSlider',
      css: `span.popslider.value { 
              box-shadow: inset 0 0 2px 0 #ffffff, 0 0 2px 0 #ffffff !important; 
            }`,
      pattern: '3x200+4000',
    });
  }
  handleMouseEnterSlider = () => {
    disableBlinkerTarget('PopSlider');
  };
  render() {
   const {value, displayValue, sliderConfig, onChange, popupStyle} = this.props;
    return (
      <StyledSpan>
        <PopSlider {...sliderConfig} {...{value, onChange, popupStyle, handleMouseEnterSlider: this.handleMouseEnterSlider}}>
          <span>
            {displayValue}
          </span>
        </PopSlider>
      </StyledSpan>
    )
  }
}
export default BlinkSlider;

