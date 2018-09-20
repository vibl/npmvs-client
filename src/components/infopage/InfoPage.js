import React from 'react';
import {pure} from 'recompose';
import styled from 'react-emotion';
import {cn, toHtmlClass} from "../../logic/utils";
import dataSpecs from './infopage-data-specs';
import {getFieldsFromSpecs} from '../../logic/utils';
const {toArray} = require('../../logic/vibl-fp');

const fields = getFieldsFromSpecs(dataSpecs);

const InfoPageWrapper = styled.div`
    position: fixed;
    top: 4rem;
    left: 1rem;
    background: white;
`;
const Row = ({fieldId, field, fieldData}) => (
  <tr>
    <td>
      {field.label}
    </td>
    <td>
      {JSON.stringify(fieldData)}
    </td>
  </tr>
);
const InfoPage = ({data, packId}) => {
  const packData = data[packId];
  return (
    <InfoPageWrapper
      className={cn('infopage', packId)}
    >
      <table>
        <tbody>
        { toArray(fields, (field, fieldId) =>
          <Row {...{key: fieldId, fieldId, field, fieldData: packData[fieldId]}}/>
        )}
        </tbody>
      </table>
    </InfoPageWrapper>
  )
};
export default pure(InfoPage);
