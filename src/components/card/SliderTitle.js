import React, {PureComponent} from 'react';
import styled from 'react-emotion';
import Slider from '@material-ui/lab/Slider';
import l from "../../util/localiz";
import InfoTip from './InfoTip';
import {registerBlinkerTarget, disableBlinkerTarget} from '../util/Blinker';

const StyledH2 = styled.h2`

    .blinker {
      padding: 0.15rem 0.2rem;
      box-shadow: inset 0 0 2px 0 #802, 0 0 2px 0 #802;
      //transition: box-shadow 1s;  // Uses too much cpu.
    }
    &:hover .tooltip {
      display: block;
      opacity: 1;
      transition: opacity 0.5s linear;
    }
    .tooltip {
      background-color: transparent;
      border-radius: 0.25rem;
      color: #802;
      display: none;
      font-size: 0.8rem;
      height: 3rem;
      left: 0;
      margin: 0 auto;
      opacity: 0;
      padding: 0.8rem;
      position: absolute;
      right: 0;
      text-align: center;
      top: 1rem;
      transition: display 0s 1s, opacity 0.3s linear;
      vertical-align: middle;
      white-space: nowrap;
      z-index: 3000;
    }
`;
class SliderTitle extends PureComponent {
  componentDidMount() {
    registerBlinkerTarget({
      id: 'PopSlider',
      css: `.chart.card.title .blinker { 
              box-shadow: inset 0 0 2px 0 #ffffff, 0 0 2px 0 #ffffff !important; 
            }`,
      pattern: '3x200+4000',
    });
  }
  handleMouseEnterSlider = () => {
    disableBlinkerTarget('PopSlider');
  };
  render() {
    const {value, infotip, displayValue, sliderConfig: {min, max, step},
      sliderWidth, onChange, textBeforeBlinker = '', textAfterBlinker = ''} = this.props;
    return (
      <StyledH2 className="chart card title tooltip-target">
        {textBeforeBlinker} <span className="blinker">{displayValue}</span> {textAfterBlinker}
        <InfoTip {...{infotip}} />
        <div className="tooltip" style={{width: sliderWidth}}>
          <Slider
            {...{value, min, max, step, onChange}}
            onMouseEnter={this.handleMouseEnterSlider}
          />
        </div>
      </StyledH2>
    )
  }
}
export default SliderTitle;