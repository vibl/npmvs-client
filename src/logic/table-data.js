import mem from "mem";
import {importData} from './mapper/import-data';
import {set, store} from './store';
import isEmpty from "lodash/isEmpty";
import {fetchChartData, getPackageRawData} from './data-fetching';
import {getSelectionFromLocation} from './router-utils';
import createFieldsTree from './mapper/create-fields-tree';
import fieldsSpecs from './field-specs';
import {add, assoc, difference, dissoc, insert, keys, last,
  map, mapObjIndexed, mergeDeepLeft, pipe, reduce, toPairs, values} from 'ramda';
import size from 'lodash/size';
const {collect, mergeTablesNotBlank} = require('./vibl-pure').default;



function initState() {
  if( ! isEmpty(store.getState()) ) return;
  const compDataInitReducer = (field, id) => ({
    meta: {
      id,
      ...field,
    },
    data: {},
  });
  const compData = mapObjIndexed(compDataInitReducer)(fieldsSpecs);
  compData.downloadsChart.chartData = [];
  set({
    fields,
    fieldsOrder: keys(fieldsSpecs),
    selection: [],
  });
}

async function addChartData(packageName) {
  const resp = await fetchChartData(packageName);
  const chartAry = agreggateDownloads(30, resp.data.downloads);
  const chartTab = tablify(packageName)(chartAry);
  set({fields:{chart:{chartData:mergeTablesNotBlank(chartTab)}}});
}
// function enhancefield(field) {
//     switch( field.type) {
//       case:
//         break;
//       case:
//         break;
//       default:
//     }
//   return field
// }

// function enhanceDataPoint(raw) {
//   const type =
//   return {
//     type,
//     raw,
//
//   }
// }
const tablify = pipe(objOf, map);

const processAndMerge = (packageName, data) => (current) => {
  // Reprendre le code de tablify et de mergeDeepLeft ou de transform.
  return newObj;
};
async function addCompData(packageName) {
  const resp = await getPackageRawData(packageName);
  set({fields: importData(packageName, resp.data)});
  // set({fields: map(enhancefield)});
}
export const addPackage = collect(addCompData, addChartData);

const removeCompData = (packageName) => set({fields: map(dissoc(packageName))});
const removeChartData = (packageName) => set({fields:{chart:{chartData: map(dissoc(packageName))}}});
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

initState()