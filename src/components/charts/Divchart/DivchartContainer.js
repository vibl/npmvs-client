import React, {PureComponent} from 'react';
import {connect} from "react-redux";
import {keys, pipe, reverse} from "ramda";
import isEmpty from "lodash/isEmpty";
import styled from 'react-emotion';
import Divchart from './DivchartView';
import {setFocus} from '../../../logic/focus';
import divchartStyles from './divchart-styles';

const { lacksElementsOf, switchValue} = require('../../../logic/vibl-fp');

const StyledDivchart = styled(Divchart)`${divchartStyles}`;

class Container extends PureComponent {
  handleMouseEnter = (packId) => {
    setFocus(packId);
  };
  render() {
    let {data} = this.props;
    const {selection, displayFn} = this.props;
    if( isEmpty(selection) || isEmpty(data) || lacksElementsOf(selection, keys(data)) ) return null;
    const packages = this.packages = reverse(selection);
    let max = 0, min = 0, absMin;
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
      min = value < min ? value : min;
      return {label, packId, value};
    });
    if( max > 100 ) data = data.map( o => ({...o, value: o.value/max * 100}));
    if( min < 0 ) {
      absMin = Math.abs(min);
      const span = max + absMin;
      data = data.map( o => ({...o, value: o.value/span * 100}));
      absMin = Math.abs(min)/span * 100;
    }
    return (
       <StyledDivchart {...{
         data,
         packages,
         handleMouseEnter: this.handleMouseEnter,
         absMin,
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

