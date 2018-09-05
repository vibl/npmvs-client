import React from 'react';
import Selector from "./Selector";
import PackList from "./PackList";

const ComparisonPage = ({props}) => (
  <div css={'width: 100%;'}>
    {/*<div>ComparisonPage</div>*/}
    <Selector/>
    <PackList/>
  </div>
);

export default ComparisonPage;
