import React from 'react';
import {pure} from 'recompose';
import l from '../../logic/localiz';
import ChartCard from '../card/ChartCard';
import Title from '../card/ChartTitle';
import LineChart from "./LineChart/LineChartContainer";
import styled from 'react-emotion';
import fn from '../../logic/field-fns';
import {connect} from "react-redux";
import {mapObjIndexed} from "ramda";
import {getData} from "../../logic/utils";

// import {divide, keys, map, mean, pipe, scan, slice, splitEvery,
//   sum, tail, toPairs, transpose, values, zip, zipWith} from "ramda";
// import regression from 'regression';
// const {multiply} = require('../../logic/vibl-fp');

const description = `
Values are adjusted for average month duration.

In other words, this chart displays what monthly downloads would be if each month lasted 30.41 days (365/12).

This is to avoid displaying variations merely due to month durations (30, 31 or 28).
`;
// const getVariations = (downloads) => {
//   const averageDaily = mean(downloads);
//   return map(val => val / averageDaily, downloads);
// };
// const getCorrections = (x) => { // {pack1: [{day: '2017-05-01', downloads: 42}, {day: ...}...], pack2: [...]
//   x = x.map(map(o => o.downloads)); // {pack1: [42, ...], pack2: [...]...]
//   x = x.map(getVariations); // {pack1: [0.87, ...], pack2: [...]...]
//   x = values(x); // [[0.87, ...], [...], ...]
//   x = transpose(x); // [[0.87, #1st val from pack2#, ...], [#2nd val from pack1#, #2nd val from pack2#], ...]
//   x = x.map(mean); // [#mean of 1st array#, #mean of 2nd array#...]
//   x = x.map(divide(1));  // [# 1 / mean of 1st array#, # 1 / mean of 2nd array#...]
//   return x;
// };
// const removePackageNoise = mem(
//   (corrections, x) => {
//     x = x.map(o => o.downloads);
//     x = zipWith(multiply, corrections);
//     return x;
//   }
// );
// const removeNoise = (data) => {
//   const corrections = getCorrections(data);
//   return map( x => removePackageNoise(corrections, x), data);
// };
//
// const weeklyDistribution = (x) => {
//   x = x.slice(-365);
//   x = x.map(o => o.downloads);
//   x = splitEvery(7, x);
//   x = x.map(sum);
//   return x;
// };
// const aggregateDistribution = (n, x) => {
//   x = x.slice(-366);
//   x = x.map(o => o.downloads);
//   x = splitEvery(366/n, x);
//   x = x.map(sum);
//   return x;
// };
// const getRegression =  (x) => {
//   x = x.map( (val, i) => [i, val]);
//   return regression.polynomial(x, { order: 9 });
// };
export const config = {
  title: 'Monthly downloads in the last 18 months<>Téléchargements mensuels dans les derniers 18 mois',
  description,
};
/*
  y = ax + b
  [1, 1000]
  [52, 3000]
  y = ax + b
  w = az + b
  y - ax = w - az
  y - w = ax - az
  y - w = a(x - z)
  a = (y - w)/(x - z)
  b = y - ax


 */
/*
  User linear regression (with the regression or the simple-stats package)
  to get seasonal variations on the server with data from the most depended upon packages.
  Include a file with monthly corrections (and update it every month).

  Display only 5 points on the screen to get a smooth curve (and use the Basis interpolation
  https://github.com/d3/d3-shape#curveBasis to filter noise)
  Use a zooming interface to allow users to see a 6 month or 2 years spans.
 */
const LineChartCard = styled(ChartCard)`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    height: calc(100% - 8px);
    min-height: 12.5rem;
`;
const DownloadSeries = ({data: rawData}) => {
  const {title, description} = config;
  if( !rawData ) return null;
  const data = mapObjIndexed(fn.monthlyAggregate, rawData);
  return (
    <LineChartCard>
      <Title {...{description: l(description)}}>{l(title)}</Title>
      <LineChart {...{data}}/>
    </LineChartCard>
  );
};
const mapStateToProps = (state) => ({
  selection: state.selection,
  data: state.data.downloads,
});
export default connect(mapStateToProps)(pure(DownloadSeries));