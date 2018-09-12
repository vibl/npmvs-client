import React from 'react';
import {pure} from 'recompose'
import {VictoryAxis, VictoryLine, VictoryChart,
  VictoryClipContainer, VictoryScatter, VictoryVoronoiContainer} from 'victory';
import theme from './theme';
import {setFocus} from "../../logic/focus"

const VoronoiContainer = ({setFocusedMonth}) => (
  <VictoryVoronoiContainer
    activateData={true}
    voronoiDimension="x"
    responsive={false}
    onActivated={(points) => {
      setFocusedMonth(points[0].month)
    }}
  />
);
const Scatter = ({pack, width, height}) => {
  const events = [
    {
      target: "data",
      eventHandlers: {
        onMouseEnter: () => [{
          target: "data",
          mutation: (p) => setFocus(p.data[0].packId),
        }],
      }
    }
  ];
  return (
    <VictoryScatter
      key={pack.packId}
      data={pack.data}
      x="month"
      y="value"
      {...{events, height, width}}
    />
  )
};
const Line = ({pack, width, height}) => {
  const events = [
    {
      target: "data",
      eventHandlers: {
        onMouseEnter: () => [{
          target: "data",
          mutation: (p) => setFocus(p.data[0].packId),
        }],
      }
    }
  ];
  return (
    <VictoryLine
      key={pack.packId}
      data={pack.data}
      x="month"
      y="value"
      interpolation="natural"
      groupComponent={<VictoryClipContainer clipPadding={{top: 30, bottom: 30, left: 0, right: 0}}/>}// Needed in order to avoid curves to be clipped at the top.
      {...{events, height, width}}
    />
  )
};
const LineChartFn = ({chartData, selection, height, width, setFocusedMonth}) => {
  console.log('Rendering LineChart:', selection, chartData);
  if( ! height || ! width ) return null;
  const shapePackData = packId => {
    const data = chartData[packId].map(o => ({...o, packId}));
    return {
      packId,
      data,
    }
  };
  const data = selection.map(shapePackData);
  return (
      <VictoryChart
        theme={theme}
        padding={{left:10, right:10, top:10, bottom:0}}
        containerComponent={VoronoiContainer({setFocusedMonth})}
        {...{height, width}}
      >
        <VictoryAxis tickFormat={() => ''}/>
        { data.map(
            pack => [
                /*No intermediary component here because VictoryBar should be a direct child of VictoryBar*/
                Line({pack, width, height}),
                Scatter({pack, width, height})
              ]
        )}
      </VictoryChart>
    )
};
export default pure(LineChartFn);