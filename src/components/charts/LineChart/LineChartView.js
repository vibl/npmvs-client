import React from 'react';
import {pure} from 'recompose'
import {Curve, Point, VictoryAxis, VictoryLine, VictoryChart,
  VictoryClipContainer, VictoryScatter, VictoryVoronoiContainer} from 'victory';
import theme from '../../theme';

const VoronoiContainer = ({setFocusedMonth}) => (
  <VictoryVoronoiContainer
    activateData={true}
    voronoiDimension="x"
    responsive={false}
    onActivated={(points) => {
      setFocusedMonth(points[0].month)
    }}
    className="VictoryContainer line-chart"
  />
);
const Scatter = ({pack, width, height, handleMouseEnter}) => (
  <VictoryScatter
    key={pack.packId}
    data={pack.data}
    x="month"
    y="value"
    dataComponent={<Point className={"scatter " + pack.packId} events={{onMouseEnter:handleMouseEnter}}/>}
    {...{height, width}}
  />
);
const Line = ({pack, width, height, handleMouseEnter}) => {
  return (
    <VictoryLine
      key={pack.packId}
      data={pack.data}
      x="month"
      y="value"
      interpolation="natural"
      dataComponent={<Curve className={"line " + pack.packId} events={{onMouseEnter:handleMouseEnter}}/>}
      groupComponent={<VictoryClipContainer clipPadding={{top: 30, bottom: 30, left: 0, right: 0}}/>}// Needed in order to avoid curves to be clipped at the top.
      {...{height, width}}
    />

  )
};
const LineBasis = ({pack, width, height, handleMouseEnter}) => {
  return (
    <VictoryLine
      key={pack.packId}
      data={pack.data}
      x="month"
      y="value"
      interpolation="basis"
      dataComponent={<Curve className={"line " + pack.packId} events={{onMouseEnter:handleMouseEnter}}/>}
      groupComponent={<VictoryClipContainer clipPadding={{top: 30, bottom: 30, left: 0, right: 0}}/>}// Needed in order to avoid curves to be clipped at the top.
      {...{height, width}}
    />

  )
};
const LineChartView = ({data, selection, height, width, setFocusedMonth, handleMouseEnter}) => {
  // console.log('Rendering LineChartView:', selection, chartData);
  return ! height || ! width ? null : (
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
                // Line({pack, width, height, handleMouseEnter}),
                Line({pack, width, height, handleMouseEnter}),
                Scatter({pack, width, height, handleMouseEnter})
              ]
        )}
      </VictoryChart>
    )
};
export default pure(LineChartView);