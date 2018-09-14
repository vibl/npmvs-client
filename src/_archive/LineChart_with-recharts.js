import React, {PureComponent} from 'react';
import { AreaChart, Area, Tooltip } from 'recharts';
import {keys, pipe, prepend, without} from 'ramda';
import isEmpty from "lodash/isEmpty";
import {pure} from "recompose";
import {connect} from "react-redux";
import {getPackageColors, getUnfocusedColor} from "../logic/derived-state";
const {putFirst} = require('../logic/vibl-fp');

function shortenNumber(num) {
  return num > 1000 ? Math.round(num / 1000) : (num / 1000).toPrecision(1)
}

// ${JSON.stringify(payload)}
const CustomTooltip = (props) => {
  const {active, payload, label} = props;
  if( ! active || ! payload[0] ) return null;
  props.offset = 100;
  console.log("Tooltip offset: ", props.offset);
  payload.sort( (a,b) => b.value - a.value );
  return (
    <div
      style={{
        color: "#F00",
        textShadow: "0px 0px 2px  #fff",
      // backgroundColor: 'BlanchedAlmond',
      textAlign: 'right'
      }}
         className="custom-tooltip">
      <table>
        <tbody>
        { payload.map( ({name, value}) => (
          <tr key={name} className="label">
            <th>
            {name}
            </th>
            <td>
              {shortenNumber(value)}k
            </td>
            </tr>
        ))}
        </tbody>
      </table>
      {/*<p className="intro">Hello</p>*/}
      {/*<p className="desc">Anything you want can be displayed here.</p>*/}
    </div>
  );
};
class LineChart extends PureComponent {
  render() {
    const {data, fieldId, focus, packageColors, selection, unfocusedColor} = this.props;
    return isEmpty(selection) || isEmpty(data) ? null : (
      <AreaChart width={400} height={100} data={data}>
        <Tooltip
          // offset={600}
          // coordinate={{ x: 100, y: 140 }}
          content={CustomTooltip}
        />
        { selection.map( (packId, row) => {
          const isFocused = packId === focus;
          const color = ! focus || isFocused ? packageColors[packId].value : unfocusedColor;
          return (
            <Area
                key={packId}
                fillOpacity={0}
                fill="#000"
                isAnimationActive={false}
                type="monotone"
                dataKey={packId}
                dot={false}
                stroke={color}
            />
        )})}
      </AreaChart>
      )
  }
}
const mapStateToProps = (state) => ({
  focus: state.focus,
  selection: state.selection,
  unfocusedColor: getUnfocusedColor(state.color.lightness),
  packageColors: getPackageColors(state.color, state.selection),
});
export default pipe(
  // pure,
  connect(mapStateToProps),
)(LineChart);
