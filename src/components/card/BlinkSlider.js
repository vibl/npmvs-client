import React, {Component} from 'react';
import {connect} from 'react-redux';
import styled from 'react-emotion';
import store from '../../data/store';
import PopSlider from "../card/PopSlider";
import {registerBlinkerTarget, disableBlinkerTarget} from '../util/Blinker';

const StyledSpan = styled.span`
    span.popslider.value {
      padding: 0.15rem 0.2rem;
      box-shadow: inset 0 0 2px 0 #802, 0 0 2px 0 #802;
      //transition: box-shadow 1s;  // Uses too much cpu.
    }
`;
let blinkerTarget, blinkerIsRegistered;

class BlinkSlider extends Component {

  componentDidMount() {
    registerBlinkerTarget({
      id: 'PopSlider',
      selector: 'span.popslider.value',
      rule: 'box-shadow: inset 0 0 2px 0 #ffffff, 0 0 2px 0 #ffffff !important',
      pattern: '3x200+4000',
    });
  }
  handleMouseEnterSlider = () => {
    store.set({session:{isNewbie: false}});
    disableBlinkerTarget('PopSlider');
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

