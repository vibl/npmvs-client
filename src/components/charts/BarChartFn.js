import React from 'react';
import {pure} from 'recompose';
import {VictoryAxis, VictoryBar, VictoryChart, VictoryContainer, VictoryLabel} from 'victory';
import styled from 'react-emotion';
import {setFocus} from '../../logic/focus';
import theme from './theme';

const Container = styled(VictoryContainer)`
  svg {
    overflow: visible;
  }
`;
const ChartBar = ({data, width, height}) => (
  <VictoryBar
    data={data}
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
        fill: n => {
          const {color, stroke } = data[n-1];
          return stroke === 'none' ? color : stroke;
        },
        padding: 8,
      }
    }}
    {...(hasNegativeValues ? {tickLabelComponent: <VictoryLabel x={60}/>} : {})}
  />
);
const BarChartFn = ({data, width, height, hasNegativeValues}) => {
  const padding = hasNegativeValues
    ? {left:100, right:30, top:20, bottom:20}
    : {left:70, right:30, top:10, bottom:20};
  const containerComponent = <Container responsive={false}/>;
  return (
    <VictoryChart {...{padding, containerComponent, theme, width, height}}>
      {/*No intermediary component here because VictoryBar should be a direct child of VictoryBar*/}
      {ChartAxis({data, hasNegativeValues})}
      {ChartBar({data, width, height})}
    </VictoryChart>
  )
};
export default pure(BarChartFn);

