import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {pure} from 'recompose';
import {Bar, BarChart, LabelList, XAxis, YAxis} from 'recharts';
import isEmpty from 'lodash/isEmpty';
import {keys, map, max, pipe, reduce, values} from 'ramda';
import {getPackageColors, getUnfocusedColor} from "../../logic/derived-state";
import dataFields from '../../logic/data-fields';
import state from "../../logic/store";
const {listMax} = require('../../logic/vibl-pure');

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
const complement = (data) => {
  const maxi = listMax(values(data));
  const reducer = (acc, key) => ({...acc, [key + '_complement']:  maxi - data[key]});
  return reduce(reducer, data, keys(data));
};
let mouseOutTimeout;
const handleMouseOver = (packId) => {
  clearTimeout(mouseOutTimeout);
  state.set({focus: packId});
};
const handleMouseOut = () => {
  mouseOutTimeout = setTimeout( () => state.set({focus: undefined}), 200);
};

class SmartBarChart extends PureComponent {

  render() {
    let {data} = this.props;
    const {fieldId, focus, packageColors, selection, unfocusedColor} = this.props;
    console.log('Rendering BarChart:', {data, selection});
    const isNegative = dataFields.charts[fieldId].negative;
    if( isNegative ) {
      data = complement(data);
    }
    return isEmpty(selection) || isEmpty(data) ? null : (
      <BarChart
        width={400}
        height={100}
        margin={{ top: 5, right: 50, bottom: 5, left: 5 }}
        layout="vertical"
        data={[data]}>
        <XAxis type="number" hide={true}/>
        <YAxis type="category" hide={true}/>
        { selection.map( (packId, row) => {
            const isFocused = packId === focus;
            const fillColor = ! focus || isFocused ? packageColors[row].value : unfocusedColor;
            return (
              [
              <Bar
                fill={isNegative ? '#FFFFFF' : fillColor}
                dataKey={packId}
                stackId={packId}
                onMouseOver={() => handleMouseOver(packId)}
                onMouseOut={handleMouseOut}
              >
                { isFocused && ! isNegative && <LabelList dataKey={packId} position="right" /> }
              </Bar>,
              isNegative &&
                <Bar
                  fill={fillColor}
                  dataKey={packId + '_complement'}
                  stackId={packId}>
                  {isFocused && <LabelList dataKey={packId} position="right"/>}
                </Bar>
             ]
            )
        })}

        {/*<Tooltip*/}
          {/*// offset={600}*/}
          {/*// coordinate={{ x: 100, y: 140 }}*/}
          {/*content={CustomTooltip}*/}
        {/*/>*/}
      </BarChart>
    )
  };
}
const mapStateToProps = (state) => ({
  focus: state.focus,
  selection: state.selection,
  unfocusedColor: getUnfocusedColor(state.color.lightness),
  packageColors: getPackageColors(state.color, state.selection),
});
export default pipe(
  pure,
  connect(mapStateToProps),
)(SmartBarChart);

