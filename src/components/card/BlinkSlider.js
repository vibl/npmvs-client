import React, {Component} from 'react';
import styled from 'react-emotion';
import PopSlider from "../card/PopSlider";
import HelpTooltip from '../generic/HelpTooltip';
import store from "../../logic/store";

const StyledSpan = styled.span`
    span.popslider.value {
      padding: 0.15rem 0.2rem;
      box-shadow: inset 0 0 2px 0 #d0b6bd, 0 0 2px 0 #d0b6bd;
      transition: box-shadow 1s;
    }
`;
class BlinkSlider extends Component {
  //  /*  Outside the class:
  // import {registerBlinkerTarget} from '../generic/Blinker';

  // `let blinkerTarketId;`*/
  // componentDidMount() {
  //   // We don't want to register more than once.
  //   if( ! blinkerTarketId ) {
  //     blinkerTarketId = registerBlinkerTarget({
  //       selector: 'span.popslider.value',
  //       rule: 'box-shadow: inset 0 0 2px 0 #ffffff, 0 0 2px 0 #ffffff !important',
  //       interval: 1000,
  //     });
  //   }
  //
  // }
 render() {
   const {value, displayValue, sliderConfig, onChange} = this.props;
    return (
      <StyledSpan>
        <PopSlider {...sliderConfig} {...{value, onChange}}>
          <HelpTooltip title={'Hover there!'} group={'PopSlider'}>
            <span>
            {displayValue}
            </span>
          </HelpTooltip>
        </PopSlider>
      </StyledSpan>
    )
  }
}
export default BlinkSlider;

