import React, {PureComponent} from 'react';
import {Curve, Point, VictoryAxis, VictoryLine, VictoryChart,
  VictoryClipContainer, VictoryScatter, VictoryVoronoiContainer} from 'victory';
import theme from './line-chart-theme';
import {monitorShouldComponentUpdateWithState} from '../../../logic/utils';

const VoronoiContainer = ({setFocusedMonth}) => (
  <VictoryVoronoiContainer
    activateData={true}
    voronoiDimension="x"
    responsive={true}
    onActivated={(points) => {
      setFocusedMonth(points[0].month)
    }}
    className="VictoryContainer line-chart"
  />
);
const Scatter = ({pack, handleMouseEnterMonth}) => (
  <VictoryScatter
    key={pack.packId}
    data={pack.data}
    x="month"
    y="value"
    dataComponent={<Point className={"scatter " + pack.packId} events={{onMouseEnter:handleMouseEnterMonth}}/>}
  />
);
const Line = ({pack, handleMouseEnterMonth}) => {
  return (
    <VictoryLine
      key={pack.packId}
      data={pack.data}
      x="month"
      y="value"
      interpolation="natural"
      dataComponent={<Curve className={"line " + pack.packId} events={{onMouseEnter:handleMouseEnterMonth}}/>}
      groupComponent={<VictoryClipContainer clipPadding={{top: 30, bottom: 30, left: 0, right: 0}}/>}// Needed in order to avoid curves to be clipped at the top.
    />

  )
};
const LineBasis = ({pack, handleMouseEnterMonth}) => {
  return (
    <VictoryLine
      key={pack.packId}
      data={pack.data}
      x="month"
      y="value"
      interpolation="basis"
      dataComponent={<Curve className={"line " + pack.packId} events={{onMouseEnter:handleMouseEnterMonth}}/>}
      groupComponent={<VictoryClipContainer clipPadding={{top: 30, bottom: 30, left: 0, right: 0}}/>}// Needed in order to avoid curves to be clipped at the top.
    />

  )
};

class LineChartView extends PureComponent {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = monitorShouldComponentUpdateWithState;
  }
  render() {
    const {data, setFocusedMonth, handleMouseEnterMonth} = this.props;
    return (
      <VictoryChart
        theme={theme}
        padding={{left:10, right:10, top:10, bottom:0}}
        containerComponent={VoronoiContainer({setFocusedMonth})}
      >
        <VictoryAxis tickFormat={() => ''}/>
        { data.map(
            pack => [
                /*No intermediary component here because VictoryBar should be a direct child of VictoryBar*/
                Line({pack, handleMouseEnterMonth}),
                Scatter({pack, handleMouseEnterMonth})
              ]
        )}
      </VictoryChart>
    )
  }
};
export default LineChartView;