import {dissoc  , map} from "ramda";
const {mergeTablesNotBlank, tablify, zipObjMap} = require('../vibl-pure');

const urlRoot = 'http://localhost:3333/downloads/'; // 'https://api.npmjs.org/downloads/'

// Top keys are endpoints name.
const extractPaths = {

};
const makeUrlBuilder =
  endpoint =>
    (packName, {timeFrame}) =>
        urlRoot + endpoint + '/' + timeFrame + '/' + encodeURIComponent(packName);

const urlBuilder = zipObjMap(makeUrlBuilder, ['range', 'point']);

const stateTransformers = {
  adding: (packName, data) => {
    const chartTab = tablify(packName)(data);
    return {charts: {downloads: {data: mergeTablesNotBlank(chartTab)}}};
  },
  removing: (packName) => (
    {charts: {downloads: {data: map(dissoc(packName))}}}
    ),
};
export default {
  stateTransformers,
  urlRoot,
  extractPaths,
  urlBuilder,
};