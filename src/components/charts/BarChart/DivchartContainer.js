import React, {PureComponent} from 'react';
import {connect} from "react-redux";
import {keys, pipe, reverse} from "ramda";
import isEmpty from "lodash/isEmpty";
import styled from 'react-emotion';
import Divchart from './Divchart';
import {setFocus} from '../../../logic/focus';
const {anyValue, isNegative, lacksElementsOf} = require('../../../logic/vibl-fp');

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
    const {data, selection, displayFn} = this.props;
    if( isEmpty(selection) || isEmpty(data) || lacksElementsOf(selection, keys(data)) ) return null;
    const packages = this.packages = reverse(selection);
    const hasNegativeValues = anyValue(isNegative, data);
    const chartData = packages.map(packId => {
      const value = data[packId];
      const label = displayFn ? displayFn(value) : value;
      return {label, packId, value};
    });
    return (
       <StyledDivchart {...{data: chartData, packages, hasNegativeValues, handleMouseEnter: this.handleMouseEnter}}/>
    );
  }
}
const mapStateToProps = (state) => ({
  selection: state.selection,
});
export default pipe(
  connect(mapStateToProps),
)(Container);

