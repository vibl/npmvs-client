import {add, filter, last,map, pipe, reduce, toPairs} from 'ramda';
import fn from './field-fns';
const {getDotPath, transform} = require('../vibl-pure').default;

export default (packageName, source, rawData) => fields => {
  const mapFn = (field) => {
    if( field.meta.source !== source ) return field;
    const rawValue = getDotPath(field.meta.path, rawData);
    const value = fn[field.meta.rawFn](rawValue);
    return transform({data:{[packageName]: value}})(field);
  };
  return map(mapFn, fields);
};