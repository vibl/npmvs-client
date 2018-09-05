import React from 'react';
import PackageTable from "../_archive/PackageTable";
import {getPackageRawData} from "../logic/package-data";
import store from "../logic/store";
import importData from "../logic/process-data";
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
