import {assoc, dissoc, map,
  mergeDeepLeft, omit, pick} from 'ramda';
import config from '../../config';
import {processData} from "../process-data";
import {chartsList} from '../charts-fields';

const {tablify} = require('../vibl-pure').default;

const urlBuilder = {
  package: (packId) => config.sources.npms + encodeURIComponent(packId),
};
const stateTransformer = {
  adding: (packId, rawData, extractTree) => {
    const data = processData(packId, 'npms', extractTree, rawData);
    const charts = pick(chartsList, data);
    const packages = omit(chartsList, data);
    const chartsTable = tablify(packId, charts);
    return {
      packages: assoc(packId, packages),
      charts: mergeDeepLeft(chartsTable),
    };
  },
  removing: (packId) => ({
    packages: dissoc(packId),
    charts: map(dissoc(packId)),
  }),
};
export default {
  stateTransformer,
  urlBuilder,
};
