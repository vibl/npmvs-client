const fs = require('fs');
const stringifyObjectLiteral = require('./stringify-object-literal');

module.exports = (file, transform) => {
  const oldObj = require(file);
  const newObj = transform(oldObj);
  const newObjLiteral = stringifyObjectLiteral(newObj);
  const fileStr = fs.readFileSync(file, {encoding: 'utf8'});
  fs.writeFileSync(file, newFileStr);
  return fileStr.replace(/module\.exports = \{[\s\S]+};/m, `module.exports = ${newObjLiteral};`);
};