import React, {PureComponent} from 'react';
import {Curve, Point, VictoryAxis, VictoryLine, VictoryChart,
  VictoryClipContainer, VictoryScatter, VictoryVoronoiContainer} from 'victory';
import theme from './line-chart-theme';
import {toHtmlClass} from '../../../util/utils';

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
const Scatter = ({pack, handleMouseEnterLine}) => (
  <VictoryScatter
    key={pack.packId}
    data={pack.data}
    x="month"
    y="value"
    dataComponent={<Point className={"scatter " + toHtmlClass(pack.packId)} events={{onMouseEnter:handleMouseEnterLine}}/>}
  />
);

const Line = ({pack: {packId, data}, handleMouseEnterLine}) => {
  const dataComponent =
    <Curve
      className={"line " + toHtmlClass(packId)}
      events={{onMouseEnter:handleMouseEnterLine}}
    />;
  const groupComponent =
    <VictoryClipContainer // Needed in order to avoid curves to be clipped at the top.
      clipPadding={{top: 30, bottom: 30, left: 0, right: 0}}
    />;
  return (
    <VictoryLine
      key={packId}
      data={data}
      x="month"
      y="value"
      interpolation="natural"
      {...{dataComponent, groupComponent}}
    />

  )
};
// const LineBasis = ({pack, handleMouseEnterLine}) => {
//   return (
//     <VictoryLine
//       key={pack.packId}
//       data={pack.data}
//       x="month"
//       y="value"
//       interpolation="basis"
//       dataComponent={<Curve className={"line " + toHtmlClass(pack.packId)} events={{onMouseEnter:handleMouseEnterLine}}/>}
//       groupComponent={<VictoryClipContainer clipPadding={{top: 30, bottom: 30, left: 0, right: 0}}/>}// Needed in order to avoid curves to be clipped at the top.
//     />
//
//   )
// };

class LineChartView extends PureComponent {
  render() {
    const {data, setFocusedMonth, handleMouseEnterLine} = this.props;
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
                Line({pack, handleMouseEnterLine}),
                Scatter({pack, handleMouseEnterLine})
              ]
        )}
      </VictoryChart>
    )
  }
};
export default LineChartView;