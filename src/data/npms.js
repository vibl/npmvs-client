import http from "../logic/http";
import store from "../logic/store";
import dataPoints from './npms_datapoints';
import extract from './extractor';

const enpointUrl = 'https://api.npms.io/v2/package/';
// const enpointUrl = 'http://localhost:3333/package/';

const idFromPath = (level, path) => {
  const nameSegments = path.slice(path.length - level, path.length);
  return nameSegments.join('_');
};
const recurse = (parent, parentPath, data) => {
  let acc = {};
  let key, node, nodePath, value;
  for (key in parent) {
    node = parent[key];
    nodePath =  [...parentPath, key];
    value = data[key];
    if( typeof node === 'number' ) {
      const id = idFromPath(node, nodePath);
      if( ! acc[id] ) acc[id] = {};
      acc[id] = value;
    } else {
      if( value ) {
        acc = {...acc, ...recurse(node, nodePath, value)};
      }
    }
  }
  return acc;
};
const getData = async (packId) => {
  const url = enpointUrl + encodeURIComponent(packId);
  const resp = await http.memGet(url);
  const data = recurse(dataPoints, ['npms'], resp.data);
  const transformer = extract(data, {packId});
  store.set(transformer);
};
export default {
  getData,
}