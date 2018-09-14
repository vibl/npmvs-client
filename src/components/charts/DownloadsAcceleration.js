import React from 'react';
import BasicCard from "../card/BasicCard";
import fn from '../../logic/field-fns';
import {map, pipe, prop, slice, splitEvery, sum} from "ramda";

const description = `
Calculated with a very simple algorithm:\n
1. The period is divided in three equals parts (here: 12/3 = 4 months periods).
2. Sums of downloads in each period: \`sum1, sum2, sum3\`
3. Deltas betweens the periods (i.e. measure of growth) :   
\`delta1 = sum2 - sum1\`   
\`delta2 = sum3 - sum2\`
4. \`acceleration = delta2 / delta1\`
`;
const extractFn = pipe(
  map(prop('downloads')),
  slice(-366, Infinity),
  splitEvery(122),
  map(sum),
  ([a,b,c]) => (c - b) / (b - a) * 100,
);
export const config = {
  label: 'Downloads acceleration in the last year',
  dataPoint: 'downloads',
  extractFn,
  displayFn: pipe(fn.significanPercentDisplay, fn.explicitPlus),
  description,
};
export default ({data}) => <BasicCard {...{config, data}} />;

