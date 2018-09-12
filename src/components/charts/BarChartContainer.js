import React, {PureComponent} from 'react';
import {connect} from "react-redux";
import {getPackageColors} from "../../logic/derived-state";
import BarChartFn from './BarChartFn';
import fields from "../../logic/data-fields";
import fns from "../../logic/mapper/field-fns";
import {keys, pipe, reverse} from "ramda";
import isEmpty from "lodash/isEmpty";
const {anyValue, isNegative, lacksElementsOf} = require('../../logic/vibl-pure');

class BarChartContainer extends PureComponent {
  render() {
    const {chartData, fieldId, focus, packageColors, selection} = this.props;
    if( isEmpty(selection) || isEmpty(chartData) || lacksElementsOf(selection, keys(chartData)) ) return null;
    // console.log('Rendering BarChart:', {data, selection});
    const packages = reverse(selection);
    const displayFn = fns(fields[fieldId].displayFn);
    const data = packages.map(packId => {
      const isFocused = packId === focus;
      const {color, colorDarker} = packageColors[packId];
      const stroke = isFocused ? colorDarker : 'none';
      const value = chartData[packId];
      const label = displayFn(value);
      return {color, label, packId, stroke, value};
    });
    const hasNegativeValues = anyValue(isNegative, chartData);
    const height = packages.length * 30;
    const width = 300;
    return isEmpty(selection) || isEmpty(chartData) ? null : (
      <BarChartFn {...{data, height, width, hasNegativeValues}}/>
    );
  }
}
const mapStateToProps = (state) => ({
  selection: state.selection,
  packageColors: getPackageColors(state.color, state.selection),
});
export default pipe(
  connect(mapStateToProps),
)(BarChartContainer);

