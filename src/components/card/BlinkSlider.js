import React, {Component} from 'react';
import {connect} from 'react-redux';
import styled from 'react-emotion';
import store from '../../logic/store';
import PopSlider from "../card/PopSlider";
import HelpTooltip from '../generic/HelpTooltip';
import {registerBlinkerTarget, unregisterBlinkerTarget} from '../generic/Blinker';

const StyledSpan = styled.span`
    span.popslider.value {
      padding: 0.15rem 0.2rem;
      box-shadow: inset 0 0 2px 0 #d0b6bd, 0 0 2px 0 #d0b6bd;
      //transition: box-shadow 1s;  // Uses too much cpu.
    }
`;
let popSliderBlinkerTarget, blinkerIsRegistered;

class BlinkSlider extends Component {

  componentDidMount() {
    if( this.props.isNewbie && ! blinkerIsRegistered ) {
      const vibrateMs = 200;
      popSliderBlinkerTarget = registerBlinkerTarget({
        selector: 'span.popslider.value',
        rule: 'box-shadow: inset 0 0 2px 0 #ffffff, 0 0 2px 0 #ffffff !important',
        cycles: [[vibrateMs, vibrateMs],[vibrateMs, vibrateMs],[2000,vibrateMs]],
      });
      blinkerIsRegistered = true; // We don't want to register more than once. Waiting for the promise is not an option because many blinkers could be created in the meantime.

      // setTimeout( () => , 1000); // Allow for the component to be rendered before starting the blinker.

    }
  }
  handleMouseEnterSlider = () => {
    store.set({session:{isNewbie: false}});
    popSliderBlinkerTarget.unregister();
  };
 render() {
   const {value, displayValue, sliderConfig, onChange, popupStyle} = this.props;
    return (
      <StyledSpan>
        <PopSlider {...sliderConfig} {...{value, onChange, popupStyle, handleMouseEnterSlider: this.handleMouseEnterSlider}}>
          {/*<HelpTooltip title={'Hover here'} group={'PopSlider'}>*/}
            <span>
            {displayValue}
            </span>
          {/*</HelpTooltip>*/}
        </PopSlider>
      </StyledSpan>
    )
  }
}
const mapStateToProps = (state) => ({
  isNewbie: state.session.isNewbie,
});
export default connect(mapStateToProps)(BlinkSlider);

