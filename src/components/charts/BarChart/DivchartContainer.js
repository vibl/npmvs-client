import React, {PureComponent} from 'react';
import {connect} from "react-redux";
import {keys, pipe, reverse} from "ramda";
import isEmpty from "lodash/isEmpty";
import styled from 'react-emotion';
import Divchart from './Divchart';
import {setFocus} from '../../../logic/focus';

const {anyValue, isNegative, lacksElementsOf, switchValue} = require('../../../logic/vibl-fp');

const StyledDivchart = styled(Divchart)`
  //.divchart .row {
  //   .bar {
  //     background-color: purple;
  //   }
  //}
`;
class Container extends PureComponent {
  handleMouseEnter = (packId) => {
    setFocus(packId);
  };
  render() {
    let {data} = this.props;
    const {selection, displayFn} = this.props;
    if( isEmpty(selection) || isEmpty(data) || lacksElementsOf(selection, keys(data)) ) return null;
    const packages = this.packages = reverse(selection);
    let max = 0, min = 0, positiveStyle, negativeStyle;
    data = packages.map(packId => {
      let value = data[packId];
      let label = switchValue([
        [Infinity, '(Not enough data: too recent)'],
        [undefined, null, isNaN, '(No data collected)'],
        displayFn ? displayFn(value) : value
      ], value);
      value = switchValue([
        [Infinity, undefined, null, isNaN, 0],
      ], value);
      max = value > max ? value : max;
      min = value < max ? value : min;
      return {label, packId, value};
    });
    if( max > 100 ) data = data.map( o => ({...o, value: o.value/max * 100}));
    if( min < 0 ) {
      const negMax = - min;
      const span = max - min;
      data = data.map( o => ({...o, value: o.value/span * 100}));
      positiveStyle = {left: negMax};
      negativeStyle = {right: max};
    }
    return (
       <StyledDivchart {...{
         data,
         packages,
         handleMouseEnter: this.handleMouseEnter,
         positiveStyle,
         negativeStyle,
       }}/>
    );
  }
}
const mapStateToProps = (state) => ({
  selection: state.selection,
});
export default pipe(
  connect(mapStateToProps),
)(Container);

