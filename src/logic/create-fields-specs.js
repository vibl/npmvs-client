const util = require('util');
const fs = require('fs');

function getName(str) {
  let acc = "";
  for (let i = 0; i < str.length; i++) {
    const char = str.charAt(i);
    const lower = char.toLowerCase();
    if( char !== lower ) {
      acc += " ";
    }
    acc += i === 0 ? char.toUpperCase() : lower;
  }
  return acc;
}

const recurse = (parentPath, obj) => {
  let result = {};
  let fieldId, key, path, pathStr, type, value;

  for (key in obj) {
    path = [...parentPath, key];
    pathStr = path.join('.');
    value = obj[key];
    type = typeof value;
    if( type === 'function') {
      fieldId = result.hasOwnProperty(key) ? pathStr : key;
      const name = getName(key);
      result[fieldId] = {
        id: fieldId,
        name: name,
        source: "npms",
        path: pathStr,
        process: value,
      };
    }
    if( type === 'object' ) {
      result = {...result, ...recurse(path, value)};
    }
  }
  return result;
};

const createFieldSpec = (mapper) => recurse('', mapper);

// const objStr = util.inspect(fieldsSpecs)
//   .replace(/\[Function: (\w+)\]/g, '$1');
//
// fs.writeFileSync(__dirname + '/field-specs.js', objStr);
// console.log(objStr);

export default createFieldSpec;