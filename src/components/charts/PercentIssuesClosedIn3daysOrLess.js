import React from 'react';
import BasicCard from "../card/BasicCard";
import fn from '../../logic/field-fns';

const description = `
-> *(Number of issues that where closed less than three days after they were open)* <-

-> divided by <-

-> *(Total number of issues)* <-
<small>In open source project, issues are usually closed when they are resolved. One exception to that rule
would be issues that are used for deliberation for long-running decisions. However, those are usually
rare and wouldn't affect this ratio much.</small>
`;
const extractFn = (issues) => {
  const {distribution: dist} = issues;
  let lessThan3daysCount = 0, totalCount = 0, seconds;
  for(seconds in dist) {
    const issues = parseInt(dist[seconds]);
    totalCount += issues;
    const days = parseInt(seconds) / 3600 / 24;
    if( days < 3.5 ) {
      lessThan3daysCount += issues;
    }
  }
  return Math.round(lessThan3daysCount / totalCount * 100);
};
export const config = {
  label: 'Percent of issues closed in 3 days or less',
  dataPoint: 'issues',
  extractFn,
  displayFn: fn.significanPercentDisplay,
  description,
};
export default ({data}) => <BasicCard {...{config, data}} />;