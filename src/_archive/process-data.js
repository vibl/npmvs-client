import {filter, map} from 'ramda';
import fields from '../data/data-fields';
import {pipeFn} from '../logic/field-fns';

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
  const npmsFields = filter( field => rawData[field.dataPoint] )(fields);
  return map(
    (field) => {
      const rawValue = rawData[field.dataPoint];
      if( ! rawValue ) {
        console.log('NO DATAPOINT WITH THIS ID:', field.dataPoint);
        return
      }
      const {extractFn} = field;
      return extractFn ? pipeFn(extractFn)(rawValue) : rawValue;
    })(npmsFields);
};
