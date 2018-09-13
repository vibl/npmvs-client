import React from 'react';
import {pure} from 'recompose';
import {Bar, VictoryAxis, VictoryBar, VictoryChart, VictoryContainer, VictoryLabel} from 'victory';
import theme from './theme';
import fields from "../../logic/data-fields";
import fns from "../../logic/mapper/field-fns";
const {anyValue, isNegative} = require('../../logic/vibl-pure');

const ChartBar = ({data, width, height, handleMouseEnter}) => (
  <VictoryBar
    aria-label="vibl"
    data={data}
    x="packId"
    y="value"
    labels={d => d.label}
    horizontal={true}
    style={{
      data: {
        strokeWidth: 2
      },
    }}
    barWidth={15}
    {...{height, width}}
    dataComponent={<Bar events={{onMouseEnter: handleMouseEnter(0, 0)}}/>}
    labelComponent={<VictoryLabel events={{onMouseEnter: handleMouseEnter(0, 3)}}/>}
    {...{height, width}}

  />
);
const ChartAxis = ({data, hasNegativeValues, handleMouseEnter}) => (
  <VictoryAxis
    data={data}
    dependentAxis
    style={{
      tickLabels: {
        padding: 8,
      }
    }}
    tickLabelComponent={
      <VictoryLabel
        events={{onMouseEnter: handleMouseEnter(1, 1)}}
        x={hasNegativeValues ? 60 : undefined}
      />}

  />
);
const BarChartFn = ({chartData, fieldId, packages, handleMouseEnter}) => {
  const hasNegativeValues = anyValue(isNegative, chartData);
  const height = packages.length * 30;
  const width = 300;
  const displayFn = fns(fields[fieldId].displayFn);
  const data = packages.map(packId => {
    const value = chartData[packId];
    const label = displayFn(value);
    return {label, packId, value};
  });
  const padding = hasNegativeValues
    ? {left:100, right:30, top:20, bottom:20}
    : {left:70, right:30, top:10, bottom:20};
  const containerComponent = <VictoryContainer className="VictoryContainer bar-chart" responsive={false}/>;
  return (
    <VictoryChart {...{padding, containerComponent, theme, width, height}}>
      {/*No intermediary component here because VictoryBar should be a direct child of VictoryBar*/}
      {ChartAxis({data, hasNegativeValues, handleMouseEnter})}
      {ChartBar({data, width, height, handleMouseEnter})}
    </VictoryChart>
  )
};
export default pure(BarChartFn);

