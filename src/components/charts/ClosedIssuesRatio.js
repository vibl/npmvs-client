import React from 'react';
import BasicCard from "../card/BasicCard";
import fn from '../../logic/field-fns';

const description = `
-> *(Number of closed issues)* <-

-> divided by <-

-> *(Total number of issues)* <-

<small>This is more relevant than just counting open issues   
because it takes into account the size of the project.   
Also, some types of projects just generate more issues   
 than others.</small>
`;
export const config = {
  label: 'Percent of closed issues',
  dataPoint: 'issues',
  extractFn: ({count, openCount}) => (count - openCount) / count * 100,
  displayFn: fn.significanPercentDisplay,
  description,
};
export default ({data}) => <BasicCard {...{config, data}} />;