import rawSpecs from './gather-specs';
import store from '../logic/store';
const {assocDotPath} = require('../logic/vibl-fp');

let indexedSpecs;

// const recurse = (parent, parentPath = []) => {
//   let acc = {};
//   let key, node, path;
//   for (key in parent) {
//     node = parent[key];
//     path =  [...parentPath, key];
//     if( Array.isArray(node) ) {
//       const [datapoint, extractFn] = node;
//       const [source, datapointId] = datapoint.split('.');
//       if( ! acc[source] ) acc[source] = {};
//       acc[source][datapointId] = {extractFn, path};
//     } else {
//       if( typeof node !== 'object' ) throw new Error('Field specs must only contains nodes of type object or arrays');
//       acc = {...acc, ...recurse(node, path)};
//     }
//   }
//   return acc;
// };

const getIndexedSpecs = () => {
  if( ! indexedSpecs ) {
    let acc = {};
    for(const specId in rawSpecs) {
      const spec = rawSpecs[specId];
      for(const storePath in spec) {
        const fields = spec[storePath];
        for(const fieldId in fields) {
          const {datapoint, extractFn} = fields[fieldId];
          const pathTemplate =  storePath + '.' + fieldId;
          acc[datapoint] = {extractFn, pathTemplate};
        }
      }
    }
    indexedSpecs = acc;
  }
  return indexedSpecs;
};
const getPath = (pathTemplate, params) => {
  let str = pathTemplate;
  for(const paramKey in params) {
    const value = params[paramKey];
    str = str.replace(`{${paramKey}}`, value);
  }
  return str;
};
const extract = (data, params) => {
  const specs = getIndexedSpecs();
  const state = store.get();
  let acc = {};
  for(const key in specs) {
    let value = data[key];
    const {extractFn, pathTemplate} = specs[key];
    const path = getPath(pathTemplate, params);
    if( extractFn ) value = extractFn({value, params, path, state, data});
    acc = assocDotPath(path, value, acc);
  }
  return acc;
};
export default extract;