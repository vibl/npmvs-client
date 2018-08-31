import mem from "mem";
import npmsMap from './mapper/npms-map';
import getRows from './mapper/getRows';
import {mapper} from './mapper/mapper';
import {set, store} from './store';
import isEmpty from "lodash/isEmpty";
import http from './http';
import {getSelectionFromLocation} from './router-utils';
import {append, assoc, difference, dissoc, filter, insert, map, mergeDeepLeft, pipe, trim} from 'ramda';
const {collect, dissocAll, log, mergeTablesNotBlank,
  tablify, transform, updateWhere} = require('./vibl-pure').default;

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
const config = {
  url: {
    npmsAPI: 'https://api.npms.io/v2/package/',
    npmDownloads: 'https://api.npmjs.org/downloads/',
  }
};
const getDownloadData = (query) => http.memGet(config.url.npmDownloads + query);

const getPackageRawData = (packageName) => http.memGet(config.url.npmsAPI + encodeURIComponent(packageName));

const getChartData = async (packageName) => {
  const query = "range/2017-08-28:2018-08-28/" + encodeURIComponent(packageName) ;
  const resp = await getDownloadData(query);
  return agreggateDownloads(30, resp.data.downloads);
};
async function addChartData(packageName) {
  const chartAry = await getChartData(packageName);
  const chartTab = tablify(packageName)(chartAry);
  set({compData:{chart:{chartData:mergeTablesNotBlank(chartTab)}}});
}
const process = pipe(
  tablify(packageName),

);
async function addCompData(packageName) {
  const resp = await getPackageRawData(packageName);
  const data = mapper(npmsMap, resp.data);
  const index = process(data);
  const computedData =
  set({compData: mergeDeepLeft(index)});
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
