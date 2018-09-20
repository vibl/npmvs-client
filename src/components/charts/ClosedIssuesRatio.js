import React from 'react';
import BasicCard from "../card/BasicCard";
import fn from '../../logic/field-fns';
import {connectStatePure} from "../../logic/utils";

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
  displayFn: fn.significanPercentDisplay,
  description,
};

const ClosedIssuesRatio = ({data}) => ! data ? null : <BasicCard {...{config, data}} />;

const selectorFn = ({issues_count, issues_openCount}) => (issues_count - issues_openCount) / issues_count * 100;

export default connectStatePure(ClosedIssuesRatio, selectorFn);
