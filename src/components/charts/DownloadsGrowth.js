import React from 'react';
import BasicCard from "../card/BasicCard";
import fn from '../../logic/field-fns';
import {juxt, map, pipe, prop, slice, sum} from "ramda";

const description = `
-> *(Number of downloads during last trimester)* <-\n
-> divided by <-\n
-> *(Number of downloads during the same trimester the year before)* <-
`;
const extractFn = pipe(
  map(prop('downloads')),
  slice(-365, Infinity),
  juxt([
    slice(0, 91),
    slice(-91, Infinity)
  ]),
  map(sum),
  ([a,b]) => b/a,
  fn.percentGrowth,
);
export const config = {
  label: 'Downloads growth in the last year',
  dataPoint: 'downloads',
  extractFn,
  displayFn: pipe(fn.significanPercentDisplay, fn.explicitPlus),
  description,
};
export default ({data}) => <BasicCard {...{config, data}} />;