import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {pure} from 'recompose';
import {XYPlot, HorizontalBarSeries} from 'react-vis';
import isEmpty from 'lodash/isEmpty';
import {keys, map, max, pipe, prop, reduce, reverse, values, zipObj} from 'ramda';
import {getPackageColors, getUnfocusedColor} from "../../logic/derived-state";
import fields from '../../logic/data-fields';
import fns from '../../logic/mapper/field-fns';
import state from "../../logic/store";
const {listMax} = require('../../logic/vibl-pure');

let mouseOutTimeout;
const handleMouseOver = (packId) => {
  clearTimeout(mouseOutTimeout);
  state.set({focus: packId});
};
const handleMouseOut = () => {
  mouseOutTimeout = setTimeout( () => state.set({focus: undefined}), 200);
};

class SmartBarChart extends PureComponent {

  render() {
    let {data} = this.props;
    const {fieldId, focus, packageColors, selection, unfocusedColor} = this.props;
    // console.log('Rendering BarChart:', {data, selection});
    const allData = reverse(selection).map( (packId) => {
      const isFocused = packId === focus;
      const fillColor = !focus || isFocused ? packageColors[packId].value : unfocusedColor;
      return {
        y: packId,
        x: data[packId] * 100,
        color: fillColor
      }
    });
    return isEmpty(selection) || isEmpty(data) ? null : (
      <XYPlot
        width={400}
        height={150}
        yType="ordinal"
        yDistance={20}
      >
        <HorizontalBarSeries
          data={allData}
          colorType="literal"
        />
      </XYPlot>
    )
  };
}
const mapStateToProps = (state) => ({
  focus: state.focus,
  selection: state.selection,
  unfocusedColor: getUnfocusedColor(state.color.lightness),
  packageColors: getPackageColors(state.color, state.selection),
});
export default pipe(
  pure,
  connect(mapStateToProps),
)(SmartBarChart);

