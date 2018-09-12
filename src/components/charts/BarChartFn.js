import React from 'react';
import {pure} from 'recompose';
import {VictoryAxis, VictoryBar, VictoryChart, VictoryContainer, VictoryLabel} from 'victory';
import {setFocus} from '../../logic/focus';
import theme from './theme';
import fields from "../../logic/data-fields";
import fns from "../../logic/mapper/field-fns";
import {reverse} from "ramda";
const {anyValue, isNegative} = require('../../logic/vibl-pure');

const ChartBar = ({data, width, height}) => (
  <VictoryBar
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
    events={[{
        target: "data",
        eventHandlers: {
          onMouseEnter: () => [{
            target: "labels",
            mutation: ({datum}) => {
              setFocus(datum.packId)
            }}]}}]}
    {...{height, width}}
  />
);
const ChartAxis = ({data, hasNegativeValues}) => (
  <VictoryAxis
    data={data}
    dependentAxis
    style={{
      tickLabels: {
        padding: 8,
      }
    }}
    {...(hasNegativeValues ? {tickLabelComponent: <VictoryLabel x={60}/>} : {})}
  />
);
const BarChartFn = ({chartData, fieldId, selection}) => {
  console.log('Rendering BarChart:', fieldId, selection, chartData);
  const packages = reverse(selection);
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
  const containerComponent = <VictoryContainer responsive={false}/>;
  return (
    <VictoryChart {...{padding, containerComponent, theme, width, height}}>
      {/*No intermediary component here because VictoryBar should be a direct child of VictoryBar*/}
      {ChartAxis({data, hasNegativeValues})}
      {ChartBar({data, width, height})}
    </VictoryChart>
  )
};
export default pure(BarChartFn);

