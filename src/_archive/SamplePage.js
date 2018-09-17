import React from 'react';
import PackageTable from "./PackageTable";
import {getPackageRawData} from "./get-data";
import store from "../logic/store";
import importData from "./process-data";
import data from '../sample/react.json';

console.log(data);
function addPackageData(packageName) {
  store.set({fields: importData(packageName, 'npms', data)});
}
addPackageData('react');

const ComparisonPage = ({props}) => (
  <div css={'width: 100%;'}>
    {/*<div>ComparisonPage</div>*/}
    <PackageTable/>
  </div>
);

export default ComparisonPage;
