import mem from "mem";
import importData from './mapper/import-data';
import {set, store} from './store';
import isEmpty from "lodash/isEmpty";
import {fetchChartData, getPackageRawData} from './data-fetching';
import {getSelectionFromLocation} from './router-utils';
import fieldsSpecs from './field-specs';
import {add, assoc, difference, dissoc, dissocPath, filter, flip, insert, juxt, keys, last,
  map, mapObjIndexed, mergeDeepLeft, pipe, reduce, toPairs, values} from 'ramda';
const {added, removed, collect, mergeTablesNotBlank, notEmpty, tablify} = require('./vibl-pure').default;

function initState() {
  if( ! isEmpty(store.getState()) ) return;
  const compDataInitReducer = (field, id) => ({
    meta: {
      id,
      ...field,
    },
    data: {},
  });
  const fields = mapObjIndexed(compDataInitReducer)(fieldsSpecs);
  fields.downloadsChart.chartData = [];
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
  set({fields:{downloadsChart:{chartData:mergeTablesNotBlank(chartTab)}}});
}
async function addPackageData(packageName) {
  if( ! packageName ) debugger;
  const resp = await getPackageRawData(packageName);
  set({fields: importData(packageName, 'npms', resp.data)});
}
export const addPackage = collect(addPackageData, addChartData);

const removePackageData = (packageName) => set({fields: map(dissocPath(['data', packageName]))});
const removeChartData = (packageName) => set({fields:{downloadsChart:{chartData: map(dissoc(packageName))}}});
export const removePackage = collect(removePackageData, removeChartData);

export const setSelection = (newSelection) => {
  const currentSelection = store.getState().selection;
  collect(
    pipe(
      added,
      filter(notEmpty),
      map(addPackage)
    ),
    pipe(
      removed,
      filter(notEmpty),
      map(removePackage),
    ),
  )(currentSelection, newSelection);
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

initState();