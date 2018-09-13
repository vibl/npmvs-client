import React, {PureComponent} from 'react';
import {connect} from "react-redux";
import {keys, pipe, reverse} from "ramda";
import isEmpty from "lodash/isEmpty";
import BarChartFn from './BarChartFn';
import {setFocus} from '../../logic/focus';
const {lacksElementsOf} = require('../../logic/vibl-pure');

class BarChartContainer extends PureComponent {
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
    const {chartData, fieldId, selection} = this.props;
    if( isEmpty(selection) || isEmpty(chartData) || lacksElementsOf(selection, keys(chartData)) ) return null;
    const packages = this.packages = reverse(selection);
    return (
       <BarChartFn {...{chartData, packages, fieldId, handleMouseEnter: this.handleMouseEnter}}/>
    );
  }
}
const mapStateToProps = (state) => ({
  selection: state.selection,
});
export default pipe(
  connect(mapStateToProps),
)(BarChartContainer);

