import React from 'react';
import {pure} from 'recompose';
import styled from 'react-emotion';
import Markdown from 'react-markdown';
import {cn, getFieldsFromSpecs} from "../../logic/utils";
import dataSpecs from './infopage-data-specs';
import {clearHideTimeout, hideInfoPage} from './infopage-display-hide';
import StyledInfoPageWrapper from './StyledInfoPageWrapper';

import {omit} from 'ramda';
const {isBlank, toArray} = require('../../logic/vibl-fp');
const fields = getFieldsFromSpecs(dataSpecs);

const FlexContainer = styled.div`
    display: flex;
      z-index: 3000;
  
`;
const DateNotice = styled.div`
    position: absolute;
    right: 1rem;
    font-size: .6rem;
    color: #802;
`;
// const handleMouseEnter
// onMouseEnter={handleMouseEnter}
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
  const leftColumnData = omit(['readme', 'updated_on'], data);
  return (
    <StyledInfoPageWrapper
      className={cn('infopage', packId)}
      onMouseEnter={clearHideTimeout}
      // onMouseLeave={hideInfoPage}
    >
      <FlexContainer>
        <div className="column left">
          <Markdown source={data.readme} escapeHtml={false} />
        </div>

        <div className="column right">
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
      </div>

      </FlexContainer>
    </StyledInfoPageWrapper>
  )
};
export default pure(InfoPage);
