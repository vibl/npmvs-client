import React, {PureComponent} from 'react';
import styled from "react-emotion";
import {mem, toHtmlClass} from '../../../util/utils';
import {pure} from 'recompose';
import {keys, last} from 'ramda';
import {setFocus} from "../../../logic/focus"
import fn from '../../../util/vibl-number';
import {getCurrentLanguage} from '../../../util/localiz';

const getStats = mem( (selection, data) => {
  let packName, result = {};
  for(packName of selection) {
    if( ! data[packName] ) continue;
    for(const {month, value} of data[packName]) {
      if( ! result[month] ) result[month] = [];
      result[month].push({packName, value});
    }
  }
  return result;
});
const AbsoluteContainer = styled.div`
    visibility: ${p => p.show ? 'visible' : 'hidden' };
    position: absolute;
    left: 0;
    top: 0;
    z-index: 3000;
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
const Month = styled.p`
    font-size: 14px;
    font-weight: bold;
    color: #555;
    text-align: center;
    margin: 0;
    text-transform: capitalize;
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
  const packName = event.currentTarget.attributes['data-packid'].value;
  setFocus(packName);
};
const StatRow = ({packName, value}) => (
  <Row
    className={`overlay ${toHtmlClass(packName)}`}
    key={packName}
    onMouseEnter={handleMouseEnter}
    data-packid={packName}
  >
    <ColPack>{packName}</ColPack><ColValue>{fn.thousands(value)}</ColValue>
  </Row>
);
const getMonthTitle = (month) => {
  const date =  new Date(month);
  return date.toLocaleDateString(getCurrentLanguage(), {month: 'long', year: 'numeric'});
};
class LineChartOverlay extends PureComponent {
  render() {
    const {focusedMonth, data, selection, mousePosition, show} = this.props;
    const stats = getStats(selection, data);
    const months = keys(stats);
    const month = focusedMonth
      ? ( focusedMonth < months[0] ? months[0] : focusedMonth )
      : last(months);
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
}


export default LineChartOverlay;