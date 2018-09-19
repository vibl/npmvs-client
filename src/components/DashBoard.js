import React from 'react';
import {pure} from 'recompose';
import styled from 'react-emotion';
import {css} from 'emotion';
import Grid from '@material-ui/core/Grid';
import cardsComponents, {chartsList} from "./charts";
import DownloadsGrowth from "./charts/DownloadsGrowth";
import theme from './styles/theme';
import {keys} from 'ramda';
import {connect} from "react-redux";

const breakpoints = theme.breakpoints.values;
const screenSizes = keys(breakpoints);

const StyledGrid = styled(Grid)`
    position: relative;
    align-items: stretch;
    margin: .4rem .1rem;
`;
const orderStyles = ({order}) => {
  let size, style, acc = [];
  for(size in order) {
    style = css`
      @media (min-width: ${breakpoints[size]}px) {
        order: ${order[size]};
      }
    `;
    acc.push(style);
  }
  return acc;
};
const StyledGridItem = styled(Grid)`
  ${orderStyles}
`;
const strToScreenCfg = str =>
  str.split(' ').reduce( (acc, val, i) => ({...acc, [screenSizes[i]]: parseInt(val)}), {});

const Column = ({sizes, order, children}) => {
  return (
    <StyledGridItem item {...{...strToScreenCfg(sizes), order: strToScreenCfg(order)}}>
      {children}
    </StyledGridItem>
  )
};
const cards =
    chartIds =>
      chartIds.map( chartId => {
        const Component = cardsComponents[chartId];
        return <Component key={chartId} {...{chartId}}/>
      });
const DashBoard = ({data}) => {
  return ! data ? null : (
    <StyledGrid
      container
      spacing={0}
      justify="center"
    >
      <Column sizes="12 10 6 6 4" order="2 2 1 1 1">
        { cards([
          'DownloadsGrowth',
          'DownloadsAcceleration',
          'CommitsForPeriod',
        ])}
      </Column>
      <Column sizes="12 10 12 12 4" order="1 1 3 3 2">
        { cards([
          'DownloadsSeries',
        ])}
      </Column>
      <Column sizes="12 10 6 6 4" order="3 3 2 2 3">
        { cards([
          'ClosedIssuesRatio',
          'IssuesClosedInLessThanXdays',
          'Contributors',
        ])}
      </Column>
    </StyledGrid>
    )
};
const mapStateToProps = (state) => ({
  data : state.data,
});
export default connect(mapStateToProps)(pure(DashBoard));