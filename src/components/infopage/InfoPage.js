import React from 'react';
import {pure} from 'recompose';
import styled from 'react-emotion';
import {css} from 'emotion';
import l, {getFullDate} from '../../logic/localiz';
import {cn, getFieldsFromSpecs} from "../../logic/utils";
import dataSpecs from './infopage-data-specs';
import {hasEntered} from './infopage-display-hide';
import StyledInfoPageWrapper from './StyledInfoPageWrapper';
import Grid from '@material-ui/core/Grid';
import theme from '../styles/theme';
import Readme from './Readme';
import {keys, without} from 'ramda';
const {isBlank, toArray} = require('../../logic/vibl-fp');

const {fieldsList, fieldsIndex} = getFieldsFromSpecs(dataSpecs);
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
// const handleMouseEnter
// onMouseEnter={handleMouseEnter}
const Row = ({fieldId, field, value}) => (
  <tr className={'row ' + fieldId}>
    <td className="cell label">
      {l(field.label)}
    </td>
    <td className="cell value">
      {value}
    </td>
  </tr>
);

const InfoPage = ({data, packId}) => {
  const tableFields = without(['readme', 'updated_on', 'readmeUpdated'], fieldsList);
  return (
    <StyledInfoPageWrapper
      className={cn('infopage', packId)}
      onMouseOver={hasEntered}
    >
      <StyledGrid
        container
        spacing={0}
        justify="center"
      >
        <Column
          className="column readme"
          sizes="12 12 12 12 6"
          order="2 2 2 2 1"
        >
          { data.readmeUpdated &&
            <div className="updated-readme">{l`Readme freshly downloaded from GitHub<>Readme téléchargé à l'instant depuis GitHub`}
              &nbsp;({getFullDate(data.readmeUpdated)})</div>
          }
            <Readme className="readme-wrapper" source={data.readme} github={data.repository}/>
        </Column>
        
        <Column
          className="column data"
          sizes="12 12 12 12 6"
          order="1 1 1 1 2"
        >
          {/*<Button onClick={hideInfoPage}>X</Button>*/}
          {/*<DateNotice>Updated on {fields.updated_on.displayFn(data.updated_on)}</DateNotice>*/}
          <table className="main">
            <tbody>
            { tableFields.map( (fieldId) => {
                const field = fieldsIndex[fieldId];
                let value = data[fieldId];
                value = field && field.displayFn ? field.displayFn(value, packId, data) : value;
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
