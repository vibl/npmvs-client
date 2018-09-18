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
    if( ! data[packId] ) continue;
    for(const {month, value} of data[packId]) {
      if( ! result[month] ) result[month] = [];
      result[month].push({packId, value});
    }
  }
  return result;
});
const AbsoluteContainer = styled.div`
    visibility: ${p => p.show ? 'visible' : 'hidden' };
    position: fixed;
    left: ${p => p.mousePosition[0] - 100}px;
    top: ${p => p.mousePosition[1] - 120}px;
    z-index: 3000;
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
    * {
      text-shadow: 
              0 0 1px white, 
              0 0 1px white, 
              0 0 1px white,
              0 0 2px white,
              0 0 2px white,
              0 0 2px white, 
              0 0 3px white, 
              0 0 3px white, 
              0 0 3px white;
    }
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
const LineChartOverlay = ({focusedMonth, data, selection, mousePosition, show}) => {
  const stats = getStats(selection, data);
  const month = focusedMonth || last(keys(stats));
  return (
    <AbsoluteContainer id="line-chart-overlay" {...{mousePosition, show}}>
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