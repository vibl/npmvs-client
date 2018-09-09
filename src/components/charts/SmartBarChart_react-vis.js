import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {pure} from 'recompose';
import {XYPlot, LineSeries, HorizontalBarSeries,} from 'react-vis';
import isEmpty from 'lodash/isEmpty';
import {keys, map, max, pipe, reduce, values} from 'ramda';
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
    return isEmpty(selection) || isEmpty(data) ? null : (
      <XYPlot
        width={300}
        height={300}>
        <HorizontalBarSeries
          data={[
            {y: 2, x: 10},
            {y: 4, x: 5},
            {y: 5, x: 15}
          ]}
        />
        <HorizontalBarSeries
          data={[
            {y: 2, x: 12},
            {y: 4, x: 2},
            {y: 5, x: 11}
          ]}/>
      </XYPlot>
      // <BarChart
      //   width={400}
      //   height={100}
      //   margin={{ top: 5, right: 50, bottom: 5, left: 5 }}
      //   layout="vertical"
      //   data={[data]}>
      //   <XAxis type="number" hide={true}/>
      //   <YAxis type="category" hide={true}/>
      //   { selection.map( (packId, row) => {
      //       const isFocused = packId === focus;
      //       const fillColor = ! focus || isFocused ? packageColors[row].value : unfocusedColor;
      //
      //       return (
      //         [
      //         <Bar
      //           fill={isNegative ? '#FFFFFF' : fillColor}
      //           dataKey={packId}
      //           stackId={packId}
      //           onMouseOver={() => handleMouseOver(packId)}
      //           onMouseOut={handleMouseOut}
      //         >
      //           { isFocused && ! isNegative && <LabelList dataKey={packId} position="right" /> }
      //         </Bar>,
      //         isNegative &&
      //           <Bar
      //             fill={fillColor}
      //             dataKey={packId + '_complement'}
      //             stackId={packId}>
      //             {isFocused && <LabelList dataKey={packId} position="right"/>}
      //           </Bar>
      //        ]
      //       )
      //   })}
      //
      //   {/*<Tooltip*/}
      //     {/*// offset={600}*/}
      //     {/*// coordinate={{ x: 100, y: 140 }}*/}
      //     {/*content={CustomTooltip}*/}
      //   {/*/>*/}
      // </BarChart>
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

