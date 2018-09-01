import mem from "mem";
import npmsMap from './mapper/npms-map';
import getRows from './mapper/getRows';
import {mapper} from './mapper/mapper';
import {set, store} from './store';
import isEmpty from "lodash/isEmpty";
import {fetchChartData, getPackageRawData} from './data-fetching';
import {getSelectionFromLocation} from './router-utils';
import {assoc, difference, dissoc, insert, map, mergeDeepLeft, pipe} from 'ramda';
const {collect, mergeTablesNotBlank, tablify} = require('./vibl-pure').default;

if( isEmpty(store.getState()) ) {
  let rows = getRows(npmsMap);
  rows = insert(2, {id: 'chart', name: 'Chart'})(rows);
  const compData = rows.reduce((acc, o) => assoc(o.id, {}, acc), {});
  compData['chart'] = {chartData: []};
  set({
    compData,
    rows,
    selection: [],
  });
}

async function addChartData(packageName) {
  const resp = await fetchChartData(packageName);
  const chartAry = agreggateDownloads(30, resp.data.downloads);
  const chartTab = tablify(packageName)(chartAry);
  set({compData:{chart:{chartData:mergeTablesNotBlank(chartTab)}}});
}
// function enhanceRow(row) {
//     switch( row.type) {
//       case:
//         break;
//       case:
//         break;
//       default:
//     }
//   return row
// }

// function enhanceDataPoint(raw) {
//   const type =
//   return {
//     type,
//     raw,
//
//   }
// }

async function addCompData(packageName) {
  const resp = await getPackageRawData(packageName);
  const process = pipe(
    mapper(npmsMap),
    // map(enhanceDataPoint),
    tablify(packageName),
  );
  const data = process(resp.data);
  set({compData: mergeDeepLeft(data)});
  // set({compData: map(enhanceRow)});
}
export const addPackage = collect(addCompData, addChartData);

const removeCompData = (packageName) => set({compData: map(dissoc(packageName))});
const removeChartData = (packageName) => set({compData:{chart:{chartData: map(dissoc(packageName))}}});
export const removePackage = collect(removeCompData, removeChartData);

export const setSelection = (newSelection) => {
  const currentSelection = store.getState().selection;
  difference(currentSelection, newSelection).forEach(removePackage);
  difference(newSelection, currentSelection).forEach(addPackage);
  set({selection: newSelection});
};
export const updateSelectionFromLocation = pipe(
  getSelectionFromLocation,
  setSelection,
);
export const agreggateDownloads = mem( (period, data) => {
  const res = [];
  let count = 0, acc = 0;
  for( let obj of data ) {
    count++;
    acc += obj.downloads;
    if( count === period ) {
      res.push(acc);
      acc = 0;
      count = 0;
    }
  }
  return res;
});
