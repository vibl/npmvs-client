import dataPoints from "./datapoints/npms_datapoints";

const idFromPath = (level, path) => {
  const nameSegments = path.slice(path.length - level, path.length);
  return nameSegments.join('_');
};
// Pick datapoints, flatten them and give each an id based on its path on the json source.
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
export default (datapointsSpec, sourceName, data) => recurse(datapointsSpec, [sourceName], data);