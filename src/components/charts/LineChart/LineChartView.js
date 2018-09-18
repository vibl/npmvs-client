import React, {Component} from 'react';
import {pure} from 'recompose'
import {Curve, LineSegment, Point, VictoryAxis, VictoryLine, VictoryChart,
  VictoryClipContainer, VictoryScatter, VictoryTooltip, VictoryVoronoiContainer} from 'victory';
import theme from './line-chart-theme';

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
const Scatter = ({pack, width, height, handleMouseEnterMonth}) => (
  <VictoryScatter
    key={pack.packId}
    data={pack.data}
    x="month"
    y="value"
    dataComponent={<Point className={"scatter " + pack.packId} events={{onMouseEnter:handleMouseEnterMonth}}/>}
    {...{height, width}}
  />
);
const Line = ({pack, width, height, handleMouseEnterMonth}) => {
  return (
    <VictoryLine
      key={pack.packId}
      data={pack.data}
      x="month"
      y="value"
      interpolation="natural"
      dataComponent={<Curve className={"line " + pack.packId} events={{onMouseEnter:handleMouseEnterMonth}}/>}
      groupComponent={<VictoryClipContainer clipPadding={{top: 30, bottom: 30, left: 0, right: 0}}/>}// Needed in order to avoid curves to be clipped at the top.
      {...{height, width}}
    />

  )
};
const LineBasis = ({pack, width, height, handleMouseEnterMonth}) => {
  return (
    <VictoryLine
      key={pack.packId}
      data={pack.data}
      x="month"
      y="value"
      interpolation="basis"
      dataComponent={<Curve className={"line " + pack.packId} events={{onMouseEnter:handleMouseEnterMonth}}/>}
      groupComponent={<VictoryClipContainer clipPadding={{top: 30, bottom: 30, left: 0, right: 0}}/>}// Needed in order to avoid curves to be clipped at the top.
      {...{height, width}}
    />

  )
};

class LineChartView extends Component {
  // shouldComponentUpdate(nextProps, nextState) {
  //   for(const key in nextProps) {
  //     if( nextProps[key] !== this.props[key]) {
  //       console.log('LineChartView props changed: ', key, this.props[key], nextProps[key]);
  //     }
  //   }
  //   for(const key in nextState) {
  //     if( nextState[key] !== this.state[key]) {
  //       console.log('LineChartView props changed: ', key, this.state[key], nextState[key]);
  //     }
  //   }
  //   return false;
  // }
  render() {
    console.log('Rendering LineChartView');
    const {data, height, width, setFocusedMonth, handleMouseEnterMonth} = this.props;
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
                // Line({pack, width, height, handleMouseEnter}),
                Line({pack, width, height, handleMouseEnterMonth}),
                Scatter({pack, width, height, handleMouseEnterMonth})
              ]
        )}
      </VictoryChart>
    )
  }
};
export default pure(LineChartView);