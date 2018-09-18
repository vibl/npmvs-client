import React, {PureComponent} from 'react';
import {connect} from "react-redux";
import {keys, pipe, reverse} from "ramda";
import isEmpty from "lodash/isEmpty";
import View from './BarChartView';
import {setFocus} from '../logic/focus';
const {anyValue, isNegative, lacksElementsOf} = require('../logic/vibl-fp');

class Container extends PureComponent {
  handleMouseEnter = (ancestryLevel, offset) => (event) => {
    let node = event.currentTarget;
    for(let i=0;i<ancestryLevel;i++) node = node.parentNode;
    const siblings = node.parentNode.childNodes;
    let i;
    for (i = 0; i < siblings.length; i++) {
      if( node === siblings[i] ) break;
    }
    const packId = this.packages[i - offset]; // Bars are rendered in reverse order.
    setFocus(packId);
  };
  render() {
    const {config: {displayFn}, data, selection} = this.props;
    if( isEmpty(selection) || isEmpty(data) || lacksElementsOf(selection, keys(data)) ) return null;
    const packages = this.packages = reverse(selection);
    const hasNegativeValues = anyValue(isNegative, data);
    const chartData = packages.map(packId => {
      const value = data[packId];
      const label = displayFn ? displayFn(value) : value;
      return {label, packId, value};
    });
    return (
       <View {...{data: chartData, packages, hasNegativeValues, handleMouseEnter: this.handleMouseEnter}}/>
    );
  }
}
const mapStateToProps = (state) => ({
  selection: state.selection,
});
export default pipe(
  connect(mapStateToProps),
)(Container);

