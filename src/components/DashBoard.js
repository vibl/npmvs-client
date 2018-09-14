import React from 'react';
import {connect} from 'react-redux';
import styled from 'react-emotion';
import {keys, mapObjIndexed, pipe, reverse, values} from 'ramda';
import Grid from '@material-ui/core/Grid';
import {getPackageColors} from "../logic/derived-state";
import cardsComponents, {chartsList} from "./charts";
import DownloadsGrowth from "./charts/DownloadsGrowth";

const {lacksElementsOf} = require('../logic/vibl-fp');

const overlayStyles = ({colors, focus}) => pipe(
  mapObjIndexed(
    ({color, colorDarker}, packId) =>
      `.VictoryContainer.line-chart + div table tr.overlay.${packId} { 
      color: ${focus === packId ? colorDarker : color}; 
      font-weight: ${focus === packId ? 'bold' : 'normal'}; 
      } `),
  values,
)(colors);

const chartStyles = ({colors, selection, focus}) => {
  const packages = reverse(selection);
  const styleMapper = (packId, i) => {
    const {color, colorDarker} = colors[packId];
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
const StyledGrid = styled(Grid)`
    position: absolute;
    padding: 10px;
    .VictoryContainer > svg {
      overflow: visible;
    }
    ${chartStyles}
    ${overlayStyles}
`;
const renderCards =
  chartsData => 
    chartIds =>
      chartIds.map( chartId => {
        const Component = cardsComponents[chartId];
        const data = chartsData[chartId];
        return ! data ? null : <Component key={chartId} {...{chartId, data}}/>
      });
const DashBoard = ({chartsData, selection, focus, colors}) => {
  const waitForData = lacksElementsOf(chartsList, keys(chartsData));
  const cards = renderCards(chartsData);
  return waitForData ? null : (
    <StyledGrid container spacing={8} {...{colors, selection, focus}}>
      <Grid item md={4} xs={12}>
        { cards([
          'DownloadsGrowth',
          'DownloadsAcceleration',
          'Commits12months',
        ])}
      </Grid>
      <Grid item md={4} xs={12}>
        { cards([
          'DownloadsSeries',
        ])}
      </Grid>
      <Grid item md={4} xs={12}>
        { cards([
          'ClosedIssuesRatio',
          'PercentIssuesClosedIn3daysOrLess',
          'Contributors',
        ])}
      </Grid>
    </StyledGrid>
    )
};
const mapStateToProps = (state) => ({
  chartsData: state.charts,
  focus: state.focus,
  selection: state.selection,
  colors: getPackageColors(state.color, state.selection),
});
export default connect(mapStateToProps)(DashBoard);