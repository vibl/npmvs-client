import {applySpec, dissoc, map, pipe} from "ramda";
import config from '../../config/config'
import {chartsConfig} from '../../components/charts/index';
const {filterKeys, zipObjMap} = require('../../logic/vibl-fp').default;

const makeUrlBuilder =
  endpoint =>
    (packName, {timeFrame}) =>
      config.sources.npmDownloads + endpoint + '/' + timeFrame + '/' + encodeURIComponent(packName);

const urlBuilder = zipObjMap(makeUrlBuilder, ['range', 'point']);

const downloadsChartsConfig = filterKeys( s => s.startsWith('Downloads'),chartsConfig );

const extractData = (packId) => pipe(
  map( o => ({[packId]: o.extractFn})),
  applySpec,
);
const stateTransformer = {
  adding: (packId, {downloads}) => {
    const chartsData = extractData(packId)(downloadsChartsConfig)(downloads);
    return ({ charts: chartsData})},
  removing: (packName) => ({
    charts: {MonthlyDownloadsSeries: map(dissoc(packName))},
  }),
};
export default {
  stateTransformer,
  urlBuilder,
};