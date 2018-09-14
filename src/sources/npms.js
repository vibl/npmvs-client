import {assoc, dissoc, filter, map, mergeDeepLeft, omit, pick} from 'ramda';
import config from '../config/config';
import {chartsConfig, chartsList} from '../components/charts/index';
const {tablify} = require('../logic/vibl-fp').default;

const idFromPath = (level, path) => {
  const nameSegments = path.slice(path.length - level, path.length);
  return nameSegments.join('.');
};
const mapRecurse = (parent, parentPath, data) => {
  let result = {};
  let key, node, nodePath;
  for (key in parent) {
    node = parent[key];
    nodePath =  [...parentPath, key];
    if( typeof node === 'number' ) {
      const id = idFromPath(node, nodePath);
      result[id] = data[key];
    } else {
      result = {...result, ...mapRecurse(node, nodePath, data[key])};
    }
  }
  return result;
};
export const processData = (packName, source, extractTree, data) => {
  const rawData = mapRecurse(extractTree, [], data);
  // First level to map: `packages:` and `charts:`
  // Second level to map: field ids.
  const npmsFields = filter( field => rawData[field.dataPoint] )(chartsConfig);
  return map(
    (field) => {
      const rawValue = rawData[field.dataPoint];
      if( ! rawValue ) {
        console.log('NO DATAPOINT WITH THIS ID:', field.dataPoint);
        return
      }
      const {extractFn} = field;
      return extractFn ? extractFn(rawValue) : rawValue;
    })(npmsFields);
};

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