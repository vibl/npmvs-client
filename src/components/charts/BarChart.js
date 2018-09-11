import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {pure} from 'recompose';
import {VictoryAxis, VictoryBar, VictoryChart, VictoryContainer, VictoryLabel} from 'victory';
import styled from 'react-emotion';
import isEmpty from 'lodash/isEmpty';
import {keys, map, pick, pipe, props, reduce, reverse, values, zipObj} from 'ramda';
import {getPackageColors} from '../../logic/derived-state';
import fields from '../../logic/data-fields';
import fns from '../../logic/mapper/field-fns';
import {setFocus} from '../../logic/focus';
import theme from './theme';
const {anyValue, hsl, ident, ifDefinedElse, isNegative, listMax, listMin} = require('../../logic/vibl-pure');

const VictoryContainer$ = styled(VictoryContainer)`
  svg {
    overflow: visible;
  }
`;

class BarChart extends PureComponent {
  render() {
    let {chartData} = this.props;
    const {fieldId, focus, packageColors, selection} = this.props;
    // console.log('Rendering BarChart:', {data, selection});
    const packages = reverse(selection);
    const displayFn = fns(fields[fieldId].displayFn);
    const barData = packages.map(packId => {
      const isFocused = packId === focus;
      const {color, colorDarker} = packageColors[packId];
      const stroke = isFocused ? colorDarker : 'none';
      const value = chartData[packId];
      return {
        packId,
        value,
        label: displayFn(value),
        color,
        stroke,
      }
    });
    const height = packages.length * 30;
    const width = 300;
    const moveTickLabel = anyValue(isNegative, chartData)
      ? {
        tickLabelComponent: <VictoryLabel x={30}/>,
        padding: {left:80, right:0, top:20, bottom:20}
      }
      : {};
    const events = [
      {
        target: "data",
        eventHandlers: {
          onMouseEnter: () => [{
            target: "labels",
            mutation: ({datum}) => {setFocus(datum.packId)},
          }],
        }
      }
    ];
    // const labelData = packages.map( packId => ({
    //   ...barData[packId],
    //   label: data[packId] * 100,
    //   style: {fontSize: 10},
    //   yOffset: 5,
    // }));
    return isEmpty(selection) || isEmpty(chartData) ? null : (
      <VictoryChart
        theme={theme}
        height={height}
        width={width}
        style={{
          parent: {  }}}
        padding={{left:40, right:0, top:10, bottom:20}}
        containerComponent={<VictoryContainer$ responsive={false}/>}
        {...moveTickLabel}
      >
        <VictoryAxis
          data={barData}
          dependentAxis
          style={{
            tickLabels: {
              fill: n => {
                const {color, stroke } = barData[n - 1];
                return stroke === 'none' ? color : stroke;
              },
              padding: 8,
            }
          }}
          // tickLabelComponent={<VictoryLabel data={barData} style={{fill: d => d.color}}/>}
          {...moveTickLabel}
        />
        <VictoryBar
          data={barData}
          x="packId"
          y="value"
          labels={d => d.label}
          horizontal={true}
          style={{
            data: {
              fill: d=>d.color,
              stroke: d=>d.stroke,
              strokeWidth: 2
            },
            labels: {
              fill: d => d.stroke === 'none' ? d.color : d.stroke,
            },
          }}
          barWidth={15}
          height={height}
          width={width}
          events={events}
        />
      </VictoryChart>

    )
  };
}

const mapStateToProps = (state) => ({
  selection: state.selection,
  packageColors: getPackageColors(state.color, state.selection),
});
export default pipe(
  pure,
  connect(mapStateToProps),
)(BarChart);

