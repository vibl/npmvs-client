import React from 'react';
import {connect} from 'react-redux';
import styled from 'react-emotion';
import {equals, filter, keys, map, mapObjIndexed, splitAt, values} from 'ramda';
import ChartCard from './ChartCard';
import {chartsFields, chartsList} from "../../logic/charts-fields";

const {haveSameElements} = require('../../logic/vibl-pure');

const Grid = styled.div`
    position: absolute;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 10px;
    grid-template-rows: repeat(3, 1fr);
    grid-auto-flow: column;
    grid-template-areas:
    "closedIssuesRatio             monthlyDownloadsSeries          percentIssuesClosedIn3daysOrLess"
    "downloadsAverageGrowth        monthlyDownloadsSeries          contributors"
    "downloadsAcceleration         monthlyDownloadsSeries          commits12months";
    padding: 10px;
`;

const DashBoard = ({chartsData, focus}) => {
  const isDataLoaded = haveSameElements(keys(chartsData), chartsList);
  return ! isDataLoaded ? null : (
    <Grid>
      { chartsList.map( fieldId => (
          <ChartCard
            key={fieldId}
            chartData={chartsData[fieldId]}
            {...{fieldId, focus}}
            {...chartsFields[fieldId]}
          />
      ))}
    </Grid>
    )
};

const mapStateToProps = (state) => ({
  chartsData: state.charts,
});
export default connect(mapStateToProps)(DashBoard);