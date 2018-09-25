const fs = require('fs');
const npmsTree = require('../data/npms_datapoints');
const stringify = require('../lib/js-data-file-transformer/stringify-object-literal');

const mapRecurse = (parent, parentPath) => {
  let acc = {};
  let key, node, nodePath, strPath;
  for (key in parent) {
    node = parent[key];
    nodePath =  [...parentPath, key];
    if( typeof node === 'object' ) {
      acc = {...acc, ...mapRecurse(node, nodePath)};
    } else {
      strPath = nodePath.join('.');
      acc[strPath] = null;
    }
  }
  return acc;
};
const extraction = mapRecurse(npmsTree, '');
fs.writeFileSync(__dirname + '/nmps_extraction.js', stringify(extraction));