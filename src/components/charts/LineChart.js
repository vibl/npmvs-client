import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {pure} from 'recompose'
import mem from 'mem';
import {VictoryAxis, VictoryLine, VictoryChart, VictoryContainer,
  VictoryClipContainer, VictoryScatter, VictoryTooltip} from 'victory';
import isEmpty from "lodash/isEmpty";
import {getPackageColors} from "../../logic/derived-state";
import fns from "../../logic/mapper/field-fns";
import fields from "../../logic/data-fields";
import theme from './theme';
import styled from "react-emotion";
import {setFocus} from "../../logic/focus"
import {keys, map, mapObjIndexed, pick, pipe, props, reduce, reverse, values, zipObj} from 'ramda';
import {withContentRect} from "react-measure";
const {collect, pipeD, pipeLog, putFirst, reIndex, reduceTemplate} = require('../../logic/vibl-pure');

const Overlay = ({month, qata}) => (
  <div>
    <h3>{month}</h3>
  </div>
);
const Overlay$ = styled(Overlay)`
    position: absolute;
    top: 0;
    left: 0;
`;
// const CustomTooltip = (props) => {
//   const {active, payload, label} = props;
//   if( ! active || ! payload[0] ) return null;
//   props.offset = 100;
//   console.log("Tooltip offset: ", props.offset);
//   payload.sort( (a,b) => b.value - a.value );
//   return (
//     <div
//       style={{
//         color: "#F00",
//         textShadow: "0px 0px 2px  #fff",
//       // backgroundColor: 'BlanchedAlmond',
//       textAlign: 'right'
//       }}
//          className="custom-tooltip">
//       <table>
//         <tbody>
//         { payload.map( ({name, value}) => (
//           <tr key={name} className="label">
//             <th>
//             {name}
//             </th>
//             <td>
//               {shortenNumber(value)}k
//             </td>
//             </tr>
//         ))}
//         </tbody>
//       </table>
//       {/*<p className="intro">Hello</p>*/}
//       {/*<p className="desc">Anything you want can be displayed here.</p>*/}
//     </div>
//   );
// };
const VictoryContainer$ = styled(VictoryContainer)`
  svg {
    overflow: visible;
    z-index: -1;
  }
`;
const getToolTipData = mem((data) => {
  let packId, result = {};
  for(packId in data) {
    for(const {month, value} of data[packId]) {
      if( ! result[month] ) result[month] = [];
      result[month].push({packId, value});
    }
  }
  return result;
});
const getToolTips = pipe(
  getToolTipData,
  map(reduceTemplate(o => {
    return  `${o.packId}: ${o.value}\n`
  })),
  mapObjIndexed( (val, month) => month + '\n\n' + val),
);
const mapStateToProps = (state) => ({
  selection: state.selection,
  packageColors: getPackageColors(state.color, state.selection),
});
const LineChartFn = ({chartData, fieldId, focus, packageColors, selection, getContentRectBounds}) => {

  const displayFn = fns(fields[fieldId].displayFn);
  const processData = packId => {
    const isFocused = packId === focus;
    const {color, colorDarker} = packageColors[packId];
    const tooltips = getToolTips(chartData);
    const data = chartData[packId].map(o => ({...o, isFocused}));
    return {
      packId,
      data,
      color,
      colorDarker,
    }
  };
  if( isEmpty(selection) || isEmpty(chartData) ) return null;
  const packages = selection.map(processData);
  // Resize chart with parent container
  const [marginHeight, marginWidth] = [40, 0];
  let {height: parentHeight, width: parentWidth} =  getContentRectBounds();
  let height = parentHeight - marginHeight;
  let width = parentWidth - marginWidth;
  // let [height, width] = [200, 200] ; // Debugging
console.log('height, width:', height, width);
  if( ! height || ! width ) return null;
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
  const Line = (pack) => {
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
        width={width}
        height={height}
        interpolation="natural"
        groupComponent={<VictoryClipContainer clipPadding={30} />}// Needed in order to avoid curves to be clipped at the top.
        // events={events}
      />
    )
  };
  const Scatter = (pack) => {
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
        // labels={(d) => d.label}
        width={width}
        height={height}
        // labelComponent={<VictoryTooltip/>}
        // groupComponent={<VictoryClipContainer clipPadding={30} />}// Needed in order to avoid curves to be clipped at the top.
        // events={events}
      />
    )
  };

    return (
        <VictoryChart
          theme={theme}
          padding={{left:10, right:10, top:10, bottom:0}}
          containerComponent={<VictoryContainer$ responsive={false}/>}
          width={width}
          height={height}
        >
          <VictoryAxis tickFormat={() => ''}/>
          { packages.map(collect(Line, Scatter))}
        </VictoryChart>
      )
};
const LineChart = pipe(
  connect(mapStateToProps),
  pure,
)(LineChartFn);

class MeasuredContainer extends PureComponent {

  getContentRectBounds() {
    return this.props.contentRect.bounds;
  }
  render () {
    const getContentRectBounds = this.getContentRectBounds.bind(this);
     // setInterval( getContentRectBounds, 2000);
    return (
      <div ref={this.props.measureRef} style={{flex: 1, width: '100%', position: 'relative'}}>
        <LineChart {...this.props} {...{getContentRectBounds}}/>
        <Overlay$/>
      </div>
    );
  }
}

export default pipe(
  withContentRect('bounds'),
)(MeasuredContainer);
