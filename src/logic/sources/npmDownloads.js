import {concat, dissoc, keys, map, without} from "ramda";
import config from '../../config';
const {mergeTablesNotBlank, tablify, zipObjMap} = require('../vibl-pure').default;

// Top keys are endpoints name.
const extractPaths = {

};
const makeUrlBuilder =
  endpoint =>
    (packName, {timeFrame}) =>
      config.sources.npms + endpoint + '/' + timeFrame + '/' + encodeURIComponent(packName);

const urlBuilder = zipObjMap(makeUrlBuilder, ['range', 'point']);

const stateTransformer = {
  adding: (packName, data) => {
    const chartTable = tablify(packName, data.charts);
    return {
      charts: {downloads: {data: mergeTablesNotBlank(chartTable)}},
    };
  },
  removing: (packName) => ({
    charts: {downloads: {data: map(dissoc(packName))}},
  }),
};
export default {
  stateTransformer,
  extractPaths,
  urlBuilder,
};