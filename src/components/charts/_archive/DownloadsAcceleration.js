import React from 'react';
import {connect} from 'react-redux';
import {pure} from 'recompose';
import l from '../../../util/localiz';
import {mem} from '../../../util/utils';
import BasicCard from "../../card/BasicCard";
import fn from '../../../data/field-fns';
import {numberOfMonths} from '../../../data/sources/source_npm-downloads';
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
  if( ! x ) return null;
  x = x.slice(-period);
  x = x.map( o => o.value);
  x = splitEvery(period/3, x);
  x = x.map(sum);
  x = (x[2] - x[1]) / (x[1] - x[0]); // Total growth
  x = (x - 1) * 100; // Percent growth.
  return x;
});

const displayFn = pipe(fn.significanPercentDisplay, fn.explicitPlus);

const DownloadsAcceleration = ({data: rawData}) => {
  if( !rawData ) return null;
  const monthlyAggregate = mapObjIndexed(fn.monthlyAggregate, rawData);
  const title = `Downloads acceleration in the last ${numberOfMonths} months<>Accélération des téléchargements dans les derniers ${numberOfMonths} mois`;
  const data = mapObjIndexed( x => getAcceleration(numberOfMonths, x), monthlyAggregate);
  return (
    <BasicCard {...{displayFn, description: l(description), title: l(title), data}} />
  );
};
const mapStateToProps = (state) => ({
  selection: state.selection,
  data: state.data.downloads,
});
export default connect(mapStateToProps)(pure(DownloadsAcceleration));


