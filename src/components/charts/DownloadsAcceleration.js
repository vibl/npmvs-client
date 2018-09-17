import React from 'react';
import {connect} from 'react-redux';
import {getData, mem} from '../../logic/utils';
import BasicCard from "../card/BasicCard";
import fn from '../../logic/field-fns';
import { mapObjIndexed, pipe, splitEvery, sum} from "ramda";

const description = `
Calculated with a very simple algorithm:\n
1. The 18 months are divided into three periods of 6 months.
2. Sums of downloads in each period: \`sum1, sum2, sum3\`
3. Deltas betweens the periods (i.e. measure of growth) :   
\`delta1 = sum2 - sum1\`   
\`delta2 = sum3 - sum2\`
4. \`acceleration = delta2 / delta1\`
`;
const getAcceleration = mem( (period, x) => {
  x = x.slice(-period);
  x = x.map( o => o.value);
  x = splitEvery(period/3, x);
  x = x.map(sum);
  x = (x[2] - x[1]) / (x[1] - x[0]); // Total growth
  x = (x - 1) * 100; // Percent growth.
  return x;
});
export const config = {
  label: 'Downloads acceleration in the last 18 months',
  displayFn: pipe(fn.significanPercentDisplay, fn.explicitPlus),
  description,
};
const DownloadsAcceleration = ({data: rawData}) => {
  if( !rawData ) return null;
  const monthlyAggregate = mapObjIndexed(fn.monthlyAggregate, rawData);
  const data = mapObjIndexed( x => getAcceleration(18, x), monthlyAggregate);
  return (
    <BasicCard {...{config, data}} />
  );
};
const mapStateToProps = (state) => ({
  data: getData(state, 'downloads'),
});
export default connect(mapStateToProps)(DownloadsAcceleration);


