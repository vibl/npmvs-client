import {dissoc, map} from "ramda";
import config from '../../config';
const {mergeTablesNotBlank, tablify, zipObjMap} = require('../vibl-pure').default;

const agreggateDownloadsData = (period, data) => {
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
};


const makeUrlBuilder =
  endpoint =>
    (packName, {timeFrame}) =>
      config.sources.npmDownloads + endpoint + '/' + timeFrame + '/' + encodeURIComponent(packName);

const urlBuilder = zipObjMap(makeUrlBuilder, ['range', 'point']);


const stateTransformer = {
  adding: (packName, data) => {
    const aggregated = agreggateDownloadsData(30, data.downloads);
    const chartTable = tablify(packName, aggregated);
    return {
      charts: {downloads: mergeTablesNotBlank(chartTable)},
    };
  },
  removing: (packName) => ({
    charts: {downloads: map(dissoc(packName))},
  }),
};
export default {
  stateTransformer,
  urlBuilder,
};