import React, {PureComponent} from 'react';
import { AreaChart, Area, Tooltip } from 'recharts';
import {store} from '../logic/store';
import {keys, pipe, prepend, without} from 'ramda';

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
}

class Chart extends PureComponent {
  render() {
    const {packName: currentPack, data} = this.props;
    if( data.length === 0 ) return null;
    const packages = pipe(
      keys,
      without([currentPack]),
      prepend(currentPack),
    )(data[0]);
    return (
      <AreaChart width={200} height={100} data={data}>
        <Tooltip
          // offset={600}
          // coordinate={{ x: 100, y: 140 }}
          content={CustomTooltip}
        />
        {
          packages.map( name => (
            <Area
              key={name}
              fillOpacity={name === currentPack ? 1 : 0}
              fill="#000"
              isAnimationActive={false}
              type="monotone"
              dataKey={name}
              dot={false}
              stroke="#CCC" />
          ))
        }
      </AreaChart>
      )
  }
}
// const Chart = ({data}) => (
//   <AreaChart width={100} height={40} data={data}>
//     <Area type="monotone" dataKey="downloads" dot={false} stroke="#8884d8" />
//   </AreaChart>
// );

export default Chart;

