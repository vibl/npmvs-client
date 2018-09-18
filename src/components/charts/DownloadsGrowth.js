import React, {Component} from 'react';
import {connect} from 'react-redux';
import ChartCard from '../card/ChartCard';
import Divchart from './BarChart/DivchartContainer';
import ChartTitle from '../card/ChartTitle';
import BlinkSlider from '../card/BlinkSlider';
import fn from '../../logic/field-fns';
import {mean, juxt, map, mapObjIndexed, pipe, prop, slice, splitEvery, sum} from "ramda";
import {getData} from "../../logic/utils";

const description = `
The choice of an algorithm to calculate growth is not as obvious as it first seems. Here the one we ended up chosing:\n
1. The period is divided in two equals parts (eg.: 12 months => 2 * 6 months periods).
2. Average of monthly downloads in each parts: \`average1, average2\`
3. Growth between the two averages = average2 / average1
4. Growth for the whole period : ( average 2 / average 1 ) * 2
`;
const periods = [6, 12, 18];
// const extractFn = pipe(
//   map(prop('downloads')),
//   slice(-365, Infinity),
//   juxt([
//     slice(0, 91),
//     slice(-91, Infinity)
//   ]),
//   map(sum),
//   ([a,b]) => b/a,
//   fn.percentGrowth,
// );
// const extractFn = (input) => {
//   const data = input.map( o => o.downloads);
//   let acc = [], days, downloads, accDownloads = 0, periodN = 0;
//   let periodDays = periods[periodN][0];
//   const maxi = Math.min(last(periods)[0], data.length);
//   for(days = 0; days < maxi; days++ ) {
//     downloads = data[days];
//     accDownloads += downloads;
//     if (days + 1 === periodDays) {
//       acc.push[accDownloads];
//       periodN++;
//       periodDays = periods[periodN][0];
//     }
//   }
//   return acc;
// };
const growth = (period, x) => {
  if( ! x ) return null;
  x = x.slice(-period);
  x = x.map( o => o.value);
  x = splitEvery(period/2, x);
  x = x.map(sum);
  x = (x[1] / x[0] - 1) * 2; // Total growth
  x = x * 100; // Percent growth.
  return x;
};
const displayFn = pipe(fn.significanPercentDisplay, fn.explicitPlus);

export const config = {displayFn}; // TODO: remove

const SliderTitle = ({description, displayValue, value, onChange, sliderConfig}) => {
  const valueSlider = <BlinkSlider
    {...{value, displayValue, onChange, sliderConfig, popupStyle: {width: '2rem'}}}/>;
  return (
    <ChartTitle {...{description}}>
      Downloads growth in the last {valueSlider} months
    </ChartTitle>
  )
};
class DownloadsGrowth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 1,
    }
  }
  onChange = (event, value) => {
    this.setState({value});
  };
  render() {
    const {onChange, props:{data: rawData}, state:{value}} = this;
    if( !rawData ) return null;
    const sliderConfig = {min: 0, max: 2, step: 1};
    const monthlyAggregate = mapObjIndexed(fn.monthlyAggregate, rawData);
    const period = periods[value];
    const data = mapObjIndexed( x => growth(period, x), monthlyAggregate);
    return (
      <ChartCard>
        <SliderTitle {...{description, value, displayValue: periods[value], onChange, sliderConfig}}/>
        <Divchart  {...{displayFn, data}}/>
      </ChartCard>
    );
  };
}
const mapStateToProps = (state) => ({
  data: getData(state, 'downloads'),
});
export default connect(mapStateToProps)(DownloadsGrowth);