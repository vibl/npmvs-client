import React from 'react';
import PackageTable from "./PackageTable";
import Selector from "./Selector";

const ComparisonPage = ({props}) => (
  <div css={'width: 100%;'}>
    {/*<div>ComparisonPage</div>*/}
    <Selector/>
    <PackageTable/>
  </div>
);

export default ComparisonPage;
