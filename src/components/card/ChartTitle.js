import React from 'react';
import InfoTip from './InfoTip';

const ChartTitle = ({infotip, children}) => (
  <h2 className="chart card title">
    {children}
    <InfoTip {...{infotip}} />
  </h2>
);
export default ChartTitle;