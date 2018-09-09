import {dissoc, map} from "ramda";
import config from '../../config'
import fns, {agreggateDownloadsData} from '../mapper/field-fns';
import fields from '../data-fields';
const {mergeTablesNotBlank, tablify, zipObjMap} = require('../vibl-pure').default;

const makeUrlBuilder =
  endpoint =>
    (packName, {timeFrame}) =>
      config.sources.npmDownloads + endpoint + '/' + timeFrame + '/' + encodeURIComponent(packName);

const urlBuilder = zipObjMap(makeUrlBuilder, ['range', 'point']);

const stateTransformer = {
  adding: (packId, data) => {
    const aggregated = fns('agreggateDownloadsData')(30, data.downloads.slice(-365));
    const chartTable = tablify(packId, aggregated);
    const downloadsAverageGrowth = fns(fields.downloadsAverageGrowth.computeFn)(data.downloads);
    const downloadsAcceleration = fns(fields.downloadsAcceleration.computeFn)(aggregated);
    return {
      charts: {
        downloads: mergeTablesNotBlank(chartTable),
        downloadsAverageGrowth: {[packId]: downloadsAverageGrowth},
        downloadsAcceleration: {[packId]: downloadsAcceleration},
      },
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