import React from 'react';
import BasicCard from "../card/BasicCard";

const description = `
Contributors with one or two commits are not usually much involved in maintaining the project. 

However, their number can skew the total count of contributors by a large margin. The number 2 is pretty arbitrary, 
but it already cuts the number by half or more in some cases. We might change it later.

In a future version of NPMvs, we will use *additions* (i.e. lines of code) to the project, as a better measure
 of contribution.
`;
export const config = {
  label: 'Contributors with more than 2 commits',
  dataPoint: 'contributors',
  extractFn: list => list.filter( o => o.commitsCount > 2 ).length,
  description,
};
export default ({data}) => <BasicCard {...{config, data}} />;