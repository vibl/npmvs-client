import React from 'react';
import BasicCard from "../card/BasicCard";
const {getDotPath} = require('../../logic/vibl-fp');

const description = `
When this number is high, it just shows that the project is somewhat active (but comparing
it between projects would be pretty meaningless).

When the number is close to 0, it definitely is a bad sign...
`;
export const config = {
  label: 'Number of commits in the last year',
  dataPoint: 'commits',
  extractFn: getDotPath('4.count'),
  description,
};
export default ({data}) => <BasicCard {...{config, data}} />;