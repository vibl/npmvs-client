import React from 'react';
import {connect} from 'react-redux';
import styled from 'react-emotion';
import {keys, mapObjIndexed, pipe, reverse, values} from 'ramda';
import Grid from '@material-ui/core/Grid';
import ChartCard from '../cards/ChartCard';
import {chartsFields, chartsList} from "../../logic/charts-fields";
import {getPackageColors} from "../../logic/derived-state";

const {haveSameElements} = require('../../logic/vibl-fp');

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
const StyledGrid = styled(Grid)`
    position: absolute;
    padding: 10px;
    .VictoryContainer > svg {
      overflow: visible;
    }
    ${chartStyles}
    ${overlayStyles}
`;
const getColumns = (fields) => {
  let acc = [[], [], []];
  for(let fieldId in fields) {
    const field = fields[fieldId];
    field.fieldId = fieldId;
    acc[field.column].push(field);
  }
  return acc;
};
const columns = getColumns(chartsFields);

const DashBoard = ({chartsData, selection, focus, packageColors}) => {
  const isDataLoaded = haveSameElements(keys(chartsData), chartsList);
  const packages = reverse(selection);
  return ! isDataLoaded ? null : (
    <StyledGrid container spacing={8} {...{packageColors, packages, focus}}>
      { columns.map( (column, i) => (
        <Grid key={i} item md={4} xs={12}>
          { column.map( field => (
              <ChartCard
                key={field.fieldId}
                chartData={chartsData[field.fieldId]}
                {...field}
              />))}
        </Grid>))}
    </StyledGrid>
    )
};
const mapStateToProps = (state) => ({
  chartsData: state.charts,
  focus: state.focus,
  selection: state.selection,
  packageColors: getPackageColors(state.color, state.selection),
});
export default connect(mapStateToProps)(DashBoard);