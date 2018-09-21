import React from 'react';
import {pure} from 'recompose';
import styled from 'react-emotion';
import {css} from 'emotion';
import Markdown from 'react-markdown';
import {cn, getFieldsFromSpecs} from "../../logic/utils";
import dataSpecs from './infopage-data-specs';
import {hasEntered, hideInfoPage} from './infopage-display-hide';
import StyledInfoPageWrapper from './StyledInfoPageWrapper';
import Grid from '@material-ui/core/Grid';

import theme from '../styles/theme';

import {keys, omit} from 'ramda';
const {isBlank, toArray} = require('../../logic/vibl-fp');
const fields = getFieldsFromSpecs(dataSpecs);
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

const Column = ({sizes, order, className, children}) => {
  return (
    <StyledGridItem item {...{...strToScreenCfg(sizes), order: strToScreenCfg(order), className}}>
      {children}
    </StyledGridItem>
  )
};
// const DateNotice = styled.div`
//     position: absolute;
//     right: 1rem;
//     font-size: .6rem;
//     color: #802;
// `;
// const handleMouseEnter
// onMouseEnter={handleMouseEnter}
const Row = ({fieldId, field, value}) => (
  <tr>
    <td className="cell label">
      {field.label}
    </td>
    <td className="cell value">
      {value}
    </td>
  </tr>
);
const InfoPage = ({data, packId}) => {
  const leftColumnData = omit(['readme', 'updated_on'], data);
  return (
    <StyledInfoPageWrapper
      className={cn('infopage', packId)}
      onMouseEnter={hasEntered}
    >
      <StyledGrid
        container
        spacing={0}
        justify="center"
      >
        <Column
          className="column left"
          sizes="12 12 12 12 6"
          order="2 2 2 2 1"
        >
          <Markdown source={data.readme} escapeHtml={false} />
        </Column>
        
        <Column
          className="column right"
          sizes="12 12 12 12 6"
          order="1 1 1 1 2"
        >
          {/*<Button onClick={hideInfoPage}>X</Button>*/}
          {/*<DateNotice>Updated on {fields.updated_on.displayFn(data.updated_on)}</DateNotice>*/}
          <table className="main">
            <tbody>
            { toArray(leftColumnData, (value, fieldId) => {
              const field = fields[fieldId];
              const {displayFn} = field;
              if( displayFn ) value = displayFn(value);
              return isBlank(value) ? null :
                <Row {...{key: fieldId, fieldId, field, value}}/>
            })}
            </tbody>
          </table>
        </Column>
      </StyledGrid>
    </StyledInfoPageWrapper>
  )
};
export default pure(InfoPage);
