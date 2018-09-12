import React, {Fragment} from 'react';
import {pure} from 'recompose'
import {VictoryAxis, VictoryLine, VictoryChart, VictoryContainer,
  VictoryClipContainer, VictoryScatter} from 'victory';
import theme from './theme';
import styled from "react-emotion";
import {setFocus} from "../../logic/focus"

const Container = styled(VictoryContainer)`
  svg {
    overflow: visible;
    z-index: -1;
  }
`;
const Scatter = ({pack, width, height, setFocusedMonth}) => {
  const events = [
    {
      target: "data",
      eventHandlers: {
        onMouseEnter: () => [{
          target: "data",
          mutation: (p) => {
            setFocus(p.data[0].packId);
            setFocusedMonth('2018-04');
          },
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
      size={p => p.isFocused ? 3 : 2}
      // labels={d => d.label}
      style={{
        data: {
          fill: pack.color,
        },
        labels: { fill: "black", fontSize: 18},
      }}
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
      // labels={d => d.label}
      style={{
        data: {
          stroke: pack.color,
          strokeWidth: p => p[0].isFocused ? 2 : 1,
        },
      }}
      interpolation="natural"
      groupComponent={<VictoryClipContainer clipPadding={{top: 30, bottom: 30, left: 0, right: 0}}/>}// Needed in order to avoid curves to be clipped at the top.
      {...{events, height, width}}
    />
  )
};
const LineChartFn = ({data, height, width, setFocusedMonth}) => {
  if( ! height || ! width ) return null;
  return (
      <VictoryChart
        theme={theme}
        padding={{left:10, right:10, top:10, bottom:0}}
        containerComponent={<Container responsive={false}/>}
        {...{height, width}}
      >
        <VictoryAxis tickFormat={() => ''}/>
        { data.map(
            pack => [
                /*No intermediary component here because VictoryBar should be a direct child of VictoryBar*/
                Line({pack, width, height}),
                Scatter({pack, width, height, setFocusedMonth})
              ]
        )}
      </VictoryChart>
    )
};
export default pure(LineChartFn);