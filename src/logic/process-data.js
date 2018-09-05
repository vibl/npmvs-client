import mem from "mem";
import {map, mapObjIndexed} from 'ramda';
import fields from './data-fields';
import {fn} from './mapper/field-fns';
const {getDotPath, transform} = require('./vibl-pure').default;

export default (packageName, source, data) => fields => {
  const mapFn = (field) => {
    if( field.meta.source !== source ) return field;
    const rawValue = getDotPath(field.meta.path, data);
    const value = fn[field.meta.rawFn](rawValue);
    return transform({data:{[packageName]: value}})(field);
  };
  return map(mapFn, fields);
};

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
  return mapObjIndexed(
    (field, fieldId) => {
      const rawValue = rawData[field.dataPoint];
      if( ! rawValue ) {
        console.log('NO DATAPOINT WITH THIS ID:', field.dataPoint);
        return
      }
      const fnName = field.computeFn;
      const value = fnName ? fn[fnName](rawValue) : rawValue;
      return {...field, value};
    })(fields.info);
};

export const fieldMapper = mem(mapRecurse);