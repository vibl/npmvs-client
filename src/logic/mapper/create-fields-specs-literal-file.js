const fs = require('fs');
const createFieldsSpecs = require('../create-fields-specs');
const stringifyObjectLiteral = require('./stringify-object-literal');
const npmsMap = require('../../_archive/npms-map').default;

const file = __dirname + '/../npms.js';
const obj = createFieldsSpecs(npmsMap);
const objLiteral = stringifyObjectLiteral(obj);
console.log(objLiteral);
fs.writeFileSync(file, objLiteral);


