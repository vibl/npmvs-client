import React from 'react';
import {connect} from 'react-redux';
import styled from 'react-emotion';
import {keys, mapObjIndexed, pipe, reverse, values} from 'ramda';
import ChartCard from './ChartCard';
import {chartsFields, chartsList} from "../../logic/charts-fields";
import {getPackageColors} from "../../logic/derived-state";

const {haveSameElements} = require('../../logic/vibl-pure');

const overlayStyles = ({packageColors, focus}) => pipe(
  mapObjIndexed(
    ({color, colorDarker}, packId) =>
      `.VictoryContainer.line-chart + div table tr.overlay.${packId} { 
      color: ${focus === packId ? colorDarker : color}; 
      font-weight: ${focus === packId ? 'bold' : 'normal'}; 
      } `),
  values,
)(packageColors);

const chartStyles = ({packageColors, packages, focus}) => {
  const styleMapper = (packId, i) => {
    const {color, colorDarker} = packageColors[packId];
    return `
      // Bars
      .bar-chart.VictoryContainer > svg > g:nth-child(2) > path:nth-child(${i+1}) {
        fill: ${color} !important;
        stroke:  ${focus === packId ? colorDarker : color} !important;
      }
      // Bar labels
      .bar-chart.VictoryContainer > svg > g:nth-child(2) > text:nth-child(${i+4}) > tspan {
        fill: ${focus === packId ? colorDarker : color} !important;
      }
      // Tick labels
      .bar-chart.VictoryContainer > svg > g:nth-child(1) > g:nth-child(${i+2}) > text > tspan {
        fill: ${focus === packId ? colorDarker : color} !important;
      }
      // Lines
      .VictoryContainer.line-chart > svg > g > path.line.${packId} {
        stroke: ${focus === packId ? colorDarker : color} !important;
        stroke-width: ${focus === packId ? 3 : 2} !important;
      }
      // Scatter
      .VictoryContainer.line-chart > svg > g > path.scatter.${packId} {
        stroke: ${focus === packId ? colorDarker : color} !important; 
        fill: ${focus === packId ? colorDarker : color} !important;
      }
    `;
  };
  return packages.map(styleMapper);
};
const Grid = styled.div`
    position: absolute;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 10px;
    grid-template-rows: repeat(3, 1fr);
    grid-auto-flow: column;
    grid-template-areas:
    "downloadsAverageGrowth       monthlyDownloadsSeries          percentIssuesClosedIn3daysOrLess"
    "downloadsAcceleration        monthlyDownloadsSeries          closedIssuesRatio"
    "commits12months              monthlyDownloadsSeries          contributors";
    padding: 10px;
    .VictoryContainer > svg {
      overflow: visible;
    }
    ${chartStyles}
    ${overlayStyles}
`;

const DashBoard = ({chartsData, selection, focus, packageColors}) => {
  const isDataLoaded = haveSameElements(keys(chartsData), chartsList);
  const packages = reverse(selection);
  return ! isDataLoaded ? null : (
    <Grid {...{packageColors, packages, focus}}>
      { chartsList.map( fieldId => (
          <ChartCard
            key={fieldId}
            chartData={chartsData[fieldId]}
            {...{fieldId}}
            {...chartsFields[fieldId]}
          />
      ))}
    </Grid>
    )
};

const mapStateToProps = (state) => ({
  chartsData: state.charts,
  focus: state.focus,
  selection: state.selection,
  packageColors: getPackageColors(state.color, state.selection),
});
export default connect(mapStateToProps)(DashBoard);