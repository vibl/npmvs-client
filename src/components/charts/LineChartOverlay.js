/* eslint-disable no-unused-vars*/
import React from 'react';
import styled from "react-emotion";
import mem from "mem";
import {map, mapObjIndexed, pipe} from 'ramda';
const {reduceTemplate} = require('../../logic/vibl-pure');

const getToolTipData = mem((data) => {
  let packId, result = {};
  for(packId in data) {
    for(const {month, value} of data[packId]) {
      if( ! result[month] ) result[month] = [];
      result[month].push({packId, value});
    }
  }
  return result;
});
const getToolTips = pipe(
  getToolTipData,
  map(reduceTemplate(o => {
    return  `${o.packId}: ${o.value}\n`
  })),
  mapObjIndexed( (val, month) => month + '\n\n' + val),
);

const AbsoluteContainer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
`;
const LineChartOverlay = ({month}) => (
  <AbsoluteContainer>
    <h3>{month}</h3>
  </AbsoluteContainer>
);

export default LineChartOverlay;