import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {pure} from 'recompose';
import { VictoryBar, VictoryContainer} from 'victory';
import isEmpty from 'lodash/isEmpty';
import {keys, map, max, pick, pipe, props, reduce, reverse, values, zipObj} from 'ramda';
import {getPackageColors, getUnfocusedColor} from "../../logic/derived-state";
import fields from '../../logic/data-fields';
import fns from '../../logic/mapper/field-fns';
import state from "../../logic/store";
const {ident, ifDefinedElse, listMax} = require('../../logic/vibl-pure');

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
    const packages = reverse(selection);
    const displayFn = fns(fields[fieldId].displayFn);
    const barData = packages.map( packId => {
      const isFocused = packId === focus;
      const fillColor = !focus || isFocused ? packageColors[packId].value : unfocusedColor;
      const value = data[packId];
      return {
        x: packId,
        y: value,
        fill: fillColor,
        label: displayFn(value),
      }
    });
    // const labelData = packages.map( packId => ({
    //   ...barData[packId],
    //   label: data[packId] * 100,
    //   style: {fontSize: 10},
    //   yOffset: 5,
    // }));
    return isEmpty(selection) || isEmpty(data) ? null : (
      <svg
        style={{
          overflow: 'visible',
          width: '350px',
          height: '100px',
        }}
        viewBox="0, 0, width, height"
      >
        <VictoryBar
          data={barData}
          x="x"
          y="y"
          labels={d => d.label}
          horizontal={true}
          style={{
            data: {
              fill: d => d.fill,
              padding: '10px',
            },
          }}
          width={350}
          height={100}
          barWidth={15}
          padding={20}
          standalone={false}
        />
      </svg>

      // {/*<XYPlot*/}
      //   {/*width={400}*/}
      //   {/*height={150}*/}
      //   {/*yType="ordinal"*/}
      //   {/*yDistance={20}*/}
      //   {/*ref={ inst => this.chart = inst}*/}
      // {/*>*/}
      //   {/*<HorizontalBarSeries*/}
      //     {/*data={barData}*/}
      //     {/*colorType="literal"*/}
      //   {/*/>*/}
      //   {/*{ this.state.labelData.length > 0 &&*/}
      //   {/*<LabelSeries*/}
      //     {/*data={this.state.labelData} />*/}
      //   {/*}*/}
      //   {/*{ this.state.hints.map( value => value && value.x > 0 && value.y > 0 &&*/}
      //     {/*<Hint*/}
      //       {/*value={value}*/}
      //     {/*>0000</Hint>*/}
      //   {/*) }*/}
      //
      //
      //   {/*<LabelSeries*/}
      //     {/*animation*/}
      //     {/*allowOffsetToBeReversed*/}
      //     {/*data={labelData} />*/}
      // </XYPlot>
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

