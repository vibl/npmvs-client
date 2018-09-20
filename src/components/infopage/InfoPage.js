import React from 'react';
import {pure} from 'recompose';
import styled from 'react-emotion';
import isObject from 'lodash/isObject';
import Card from '@material-ui/core/Card';
import Markdown from 'react-markdown';
import {cn, getFieldsFromSpecs} from "../../logic/utils";
import dataSpecs from './infopage-data-specs';
import {clearHideTimeout, hideInfoPage} from './infopage-display-hide';
import theme from '../styles/theme';

import {omit} from 'ramda';
const {isEmpty, toArray} = require('../../logic/vibl-fp');
const fields = getFieldsFromSpecs(dataSpecs);

const InfoPageWrapper = styled(Card)`
    position: absolute;
    top: 3rem;
    left: 0.3rem;
    width: calc(100% - 0.6rem);
    pre {
      white-space: pre-wrap;
    }
    h1, h2, h3, h4 {
      color: ${theme.palette.primary.main};
    }
    .column {
      flex: 1 1 50%;
      margin: 1rem;
    
    }
    td {
      padding: .5rem 0;
}    }
`;
const FlexContainer = styled.div`
    display: flex;
`
const Column = styled.div`
  
`;

const Row = ({fieldId, field, value}) => (
  <tr>
    <td className="cell label">
      {field.label}:
    </td>
    <td className="cell value">
      {value}
    </td>
  </tr>
);
const InfoPage = ({data, packId}) => {
  const leftColumnData = omit(['readme'], data);
  return (
    <InfoPageWrapper
      className={cn('infopage', packId)}
      onMouseEnter={clearHideTimeout}
      // onMouseLeave={hideInfoPage}
    >
      <FlexContainer>
        <Column className="column left">
          <Markdown source={data.readme} escapeHtml={false} />
        </Column>

        <Column className="column right">
        <table>
          <tbody>
          { toArray(leftColumnData, (value, fieldId) => {
            const field = fields[fieldId];
            const {displayFn} = field;
            if( displayFn ) value = displayFn(value);
            return isEmpty(value) ? null :
              <Row {...{key: fieldId, fieldId, field, value}}/>
          })}
          </tbody>
        </table>
      </Column>

      </FlexContainer>
    </InfoPageWrapper>
  )
};
export default pure(InfoPage);
