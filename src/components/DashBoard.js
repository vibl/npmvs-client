import React from 'react';
import {connect} from 'react-redux';
import styled from 'react-emotion';
import Grid from '@material-ui/core/Grid';
import {getPackageColors} from "../logic/utils";
import cardsComponents, {chartsList} from "./charts";
import DownloadsGrowth from "./charts/DownloadsGrowth";
import {toHtmlClass} from '../logic/utils';

import {keys, mapObjIndexed, pipe, reverse, values} from 'ramda';
const {hsl} = require('../logic/vibl-fp');

const chartStyles = ({colors, selection, focus}) => {
  const packages = reverse(selection);
  const styleMapper = (packId, i) => {
    const {baseColor, colorDarker, lightGradient} = colors[packId];
    const hasFocus = focus === packId;
    const switchColor = hasFocus ? colorDarker : baseColor;
    const packIdClass = toHtmlClass(packId);
    return `
      // Bars
      .bar-chart.VictoryContainer > svg > g:nth-child(2) > path:nth-child(${i+1}) {
        fill: ${baseColor} !important;
        stroke:  ${switchColor} !important;
      }
      // Bar labels
      .bar-chart.VictoryContainer > svg > g:nth-child(2) > text:nth-child(${i+4}) > tspan {
        fill: ${switchColor} !important;
      }
      // Tick labels
      .bar-chart.VictoryContainer > svg > g:nth-child(1) > g:nth-child(${i+2}) > text > tspan {
        fill: ${switchColor} !important;
      }
      // Lines
      .VictoryContainer.line-chart > svg > g > path.line.${packIdClass} {
        stroke: ${switchColor} !important;
        stroke-width: ${hasFocus ? 3 : 2} !important;
      }
      // Scatter
      .VictoryContainer.line-chart > svg > g > path.scatter.${packIdClass} {
        stroke: ${switchColor} !important; 
        fill: ${switchColor} !important;
      }
      // Overlay
      .VictoryContainer.line-chart + div table tr.overlay.${packIdClass} { 
        color: ${switchColor}; 
        font-weight: ${hasFocus ? '500' : 'normal'}; 
      }
      ///////////////////////////////////////////////////////////////////////////
      // Divcharts
      .divchart {   
        
        .label-row  {
           margin-right: 0.3rem;
        }
        .label-row, .value {
           font-size: 0.7rem;
           font-weight: ${hasFocus ? '500' : 'normal'}; 
        }
        .data-row, .label-row {
           height: 0.8rem;
           margin-top: 0.25rem;
           margin-bottom: 0.25rem
        }
        .bar {
          border: 0; 
          vertical-align: middle;
        }
        .value {
          margin-left: 0.3rem;
          vertical-align: middle;
        }  
        .label-row.${packIdClass} {
            color: ${switchColor};
         }  
        .data-row.${packIdClass} {
          .bar {
            background: ${lightGradient};
            box-shadow: 
            ${ hasFocus ?
            `0 0 3px 3px ${colorDarker} 
            ,inset -1px -1px 1px 0px ${colorDarker};`
            : `0 0 2px 0 ${baseColor}; border: 1px solid ${baseColor};`}
          }
          .bar[value='0'] {
            box-shadow: none;
            border: none;
           }
          .value {
            color: ${switchColor};
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
`;
const cards =
    chartIds =>
      chartIds.map( chartId => {
        const Component = cardsComponents[chartId];
        return <Component key={chartId} {...{chartId}}/>
      });
const DashBoard = ({selection, focus, colors, data}) => {
  return ! data ? null : (
    <StyledGrid container spacing={0} {...{colors, selection, focus}}>
     <Grid item md={4} sm={6} xs={12}>
        { cards([
          'DownloadsGrowth',
          'DownloadsAcceleration',
          'CommitsForPeriod',
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
  data : state.data,
  focus: state.focus,
  selection: state.selection,
  colors: getPackageColors(state.color, state.selection),
});
export default connect(mapStateToProps)(DashBoard);