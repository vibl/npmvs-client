import React from 'react';
import {connect} from "react-redux";
import {pure} from 'recompose';
import BasicCard from "../card/BasicCard";
import fn from '../../logic/field-fns';
import {getData} from "../../logic/utils";

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

const ClosedIssuesRatio =  ({data}) => ! data ? null : <BasicCard {...{config, data}} />;

const extractFn = (count, openCount) => (count - openCount) / count * 100;

const mapStateToProps = (state) => ({
  data: getData(extractFn, state.data.issues_count, state.data.issues_openCount),
});
export default connect(mapStateToProps)(pure(ClosedIssuesRatio));
