import React from 'react';
import InfoTip from './InfoTip';

const ChartTitle = ({description, children}) => (
  <h2 className="chart card title">
    {children}
    <InfoTip {...{description}} />
  </h2>
);
export default ChartTitle;