import {assoc, contains, dissoc, filter, keys, map,
  mergeDeepLeft, omit, pick} from 'ramda';
import state from '../store';
import fields from '../data-fields';
import config from '../../config';
import {processData} from "../process-data";
const {tablify} = require('../vibl-pure').default;

const urlBuilder = {
  package: (packId) => config.sources.npms + encodeURIComponent(packId),
};
const stateTransformer = {
  adding: (packId, rawData, extractTree) => {
    const data = processData(packId, 'npms', extractTree, rawData);
    const barChartList = state.get().barChartList;
    const charts = pick(barChartList, data);
    const packages = omit(barChartList, data);
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
