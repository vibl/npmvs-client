import {assoc, contains, dissoc, filter, keys, map,
  mergeDeepLeft, omit, pick} from 'ramda';
import fields from '../data-fields';
import config from '../../config';
import {processData} from "../process-data";
const {tablify} = require('../vibl-pure').default;

const urlBuilder = {
  package: (packId) => config.sources.npms + encodeURIComponent(packId),
};
const chartsFields = keys(filter( field => contains(field.component, ['SmartBarChart', 'LineChart']), fields));

const stateTransformer = {
  adding: (packId, rawData, extractTree) => {
    const data = processData(packId, 'npms', extractTree, rawData);
    const charts = pick(chartsFields, data);
    const packages = omit(chartsFields, data);
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
