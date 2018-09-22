import React from 'react';
import l from '../../logic/localiz';
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
 <>
-> *(Nombre de tickets fermés)* <-

-> divisé par <-

-> *(Nombre total de tickets)* <-
`;
const title = 'Percent of closed issues<>Pourcentage de tickets fermés';
const displayFn = fn.significanPercentDisplay;

const ClosedIssuesRatio = ({data}) => ! data ? null :
  <BasicCard {...{title: l(title), description: l(description), displayFn, data}} />

const selectorFn = ({issues_count, issues_openCount}) => (issues_count - issues_openCount) / issues_count * 100;

export default connectStatePure(ClosedIssuesRatio, selectorFn);
