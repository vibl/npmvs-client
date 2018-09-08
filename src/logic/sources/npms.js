import {assoc, concat, dissoc, keys, map, mergeDeepLeft, without} from 'ramda';
import config from '../../config';
const {tablify} = require('../vibl-pure').default;

const urlBuilder = {
  package: (packId) => config.sources.npms + encodeURIComponent(packId),
};
const stateTransformer = {
  adding: (packId, data) => {
    const table = tablify(packId, data.charts);
    return {
      packages: assoc(packId, data.packages),
      charts: mergeDeepLeft(table),
    };
  },
  removing: (packId) => ({
    packages: dissoc(packId),
    charts: map(map(dissoc(packId))),
  }),
};
export default {
  stateTransformer,
  urlBuilder,
};
