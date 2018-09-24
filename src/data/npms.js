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
const updateReadme = async (data, packId) => {
  const readmeUrl = data.collected.metadata.links.repository
    .replace(/https?:\/\/github.com\/([^/]+\/[^/]+).*/, 'https://raw.githubusercontent.com/$1/master/README.md');
  const readme = await http.memGet(readmeUrl);
  if( readme.data ) {
    store.trans({data:{InfoPages:{[packId]: {
      readme: readme.data,
      readmeUpdated: new Date(),
    }}}});
  }

}
const getData = async (packId) => {
  const url = enpointUrl + encodeURIComponent(packId);
  const resp = await http.memGet(url);
  if( ! resp.data ) throw new Error('Data could not be downloaded from', url);
  const data = recurse(dataPoints, ['npms'], resp.data);
  const transformer = extract(data, {packId});
  store.trans(transformer);
  await updateReadme(resp.data, packId);
};
export default {
  getData,
}