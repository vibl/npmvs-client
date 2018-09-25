import React from 'react';
import {pure} from 'recompose';
import styled from 'react-emotion';
import {css} from 'emotion';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import cardsComponents from "../charts/index";
import theme from '../styles/theme';
import {keys} from 'ramda';
import {connect} from "react-redux";
import {history} from '../../logic/router-utils';
const {isBlank} = require('../../logic/vibl-fp');


const breakpoints = theme.breakpoints.values;
const screenSizes = keys(breakpoints);

const StyledGrid = styled(Grid)`
    position: relative;
    align-items: stretch;
    margin: .4rem .1rem;
    width: 99.9%;
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
const DashBoard = ({data, selection}) => {
  return isBlank(data) || isBlank(selection)
    ? <Button onClick={() => history.push('recharts-vs-victory-vs-react-vis')}>Charger des données de test</Button>
    : (
    <StyledGrid
      container
      spacing={0}
      justify="center"
    >
      <Column sizes="12 10 6 6 4" order="2 2 1 1 1">
        { cards([
          'GitHubScore',
          'DependentReposCount',
          'ReleasesForPeriod',
        ])}
      </Column>
      <Column sizes="12 10 12 12 4" order="1 1 3 3 2">
        { cards([
          // 'DownloadsSeries',
        ])}
      </Column>
      <Column sizes="12 10 6 6 4" order="3 3 2 2 3">
        { cards([
          // 'Contributors',
          // 'ClosedIssuesRatio',
          // 'IssuesClosedInLessThanXdays',
        ])}
      </Column>
    </StyledGrid>
    )
};
const mapStateToProps = (state) => ({
  data : state.data,
  selection: state.selection,
});
export default connect(mapStateToProps)(pure(DashBoard));