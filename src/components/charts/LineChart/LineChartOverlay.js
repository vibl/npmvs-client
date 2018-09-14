import React from 'react';
import styled from "react-emotion";
import mem from "mem";
import {pure} from 'recompose';
import {keys, last} from 'ramda';
import {setFocus} from "../../../logic/focus"
import fn from '../../../logic/field-fns';

const getStats = mem( (selection, data) => {
  let packId, result = {};
  for(packId of selection) {
    for(const {month, value} of data[packId]) {
      if( ! result[month] ) result[month] = [];
      result[month].push({packId, value});
    }
  }
  return result;
});
const AbsoluteContainer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
`;
const Month = styled.p`
    font-size: 14px;
    font-weight: bold;
    color: #555;
    text-align: center;
    margin: 0;
`;
const Table = styled.table`
    font-size: 14px;
`;
const Row = styled.tr`
    height: 20px;
`;
const ColPack = styled.td`
  
`;
const ColValue = styled.td`
   text-align: right;
`;
const handleMouseEnter = (event) => {
  const packId = event.currentTarget.attributes['data-packid'].value;
  setFocus(packId);
};
const StatRow = ({packId, value}) => (
  <Row
    className={`overlay ${packId}`}
    key={packId}
    onMouseEnter={handleMouseEnter}
    data-packid={packId}
  >
    <ColPack>{packId}</ColPack><ColValue>{fn.thousands(value)}</ColValue>
  </Row>
);
const getMonthTitle = (month) => {
  const date =  new Date(month);
  return date.toLocaleDateString('en-US', {month: 'long', year: 'numeric'});
};
const LineChartOverlay = ({focusedMonth, data, selection}) => {
  const stats = getStats(selection, data);
  const month = focusedMonth || last(keys(stats));
  return (
    <AbsoluteContainer>
      <Month>{getMonthTitle(month)}</Month>
      <Table>
        <tbody>
        { stats[month].map(StatRow) }
        </tbody>
      </Table>
    </AbsoluteContainer>
  );
};

export default pure(LineChartOverlay);