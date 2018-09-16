import React from 'react';
import {connect} from 'react-redux';
import styled from 'react-emotion';
import {keys, mapObjIndexed, pipe, reverse, values} from 'ramda';
import Grid from '@material-ui/core/Grid';
import {getPackageColors} from "../logic/derived-state";
import cardsComponents, {chartsList} from "./charts";
import DownloadsGrowth from "./charts/DownloadsGrowth"

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
    const {color: baseColor, colorDarker} = colors[packId];
    const color = focus === packId ? colorDarker : baseColor;
    return `
      // Bars
      .bar-chart.VictoryContainer > svg > g:nth-child(2) > path:nth-child(${i+1}) {
        fill: ${baseColor} !important;
        stroke:  ${color} !important;
      }
      // Bar labels
      .bar-chart.VictoryContainer > svg > g:nth-child(2) > text:nth-child(${i+4}) > tspan {
        fill: ${color} !important;
      }
      // Tick labels
      .bar-chart.VictoryContainer > svg > g:nth-child(1) > g:nth-child(${i+2}) > text > tspan {
        fill: ${color} !important;
      }
      // Lines
      .VictoryContainer.line-chart > svg > g > path.line.${packId} {
        stroke: ${color} !important;
        stroke-width: ${focus === packId ? 3 : 2} !important;
      }
      // Scatter
      .VictoryContainer.line-chart > svg > g > path.scatter.${packId} {
        stroke: ${color} !important; 
        fill: ${color} !important;
      }
      ///////////////////////////////////////////////////////////////////////////
      // Divcharts
      .divchart {   
        
        .label-row  {
           margin-right: 0.3rem;
        }
        .label-row, .value {
           font-size: 0.7rem;
        }
        .data-row, .label-row {
           height: 0.8rem;
           margin-top: 0.25rem;
           margin-bottom: 0.25rem
        }
        .bar {
          border: 2px solid; 
          vertical-align: middle;
        }
        .value {
          margin-left: 0.3rem;
          vertical-align: middle;
        }  
        .label-row.${packId} {
            color: ${color};
         }  
        .data-row.${packId} {
          .bar {
            background: ${baseColor};
            border-color:  ${color};
            box-shadow: 0 0 2px 0 #d0b6bd;
          }
          .value {
            color: ${color};
          }
        }
      }
    `;
  };
  return packages.map(styleMapper);
};
const StyledGrid = styled(Grid)`
    position: relative;
    align-items: stretch;
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
  // const waitForData = lacksElementsOf(chartsList, keys(chartsData));
  const cards = renderCards(chartsData);
  return /*waitForData ? null : */(
    <StyledGrid container spacing={0} {...{colors, selection, focus}}>
      <Grid item md={4} sm={6} xs={12}>
        { cards([
          'DownloadsGrowth',
          'DownloadsAcceleration',
          'Commits12months',
        ])}
      </Grid>
      <Grid item md={4} sm={6} xs={12}>
        { cards([
          'DownloadsSeries',
        ])}
      </Grid>
      <Grid item md={4} sm={6} xs={12}>
        { cards([
          'ClosedIssuesRatio',
          'IssuesClosedInLessThanXdays',
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