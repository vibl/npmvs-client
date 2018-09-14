const axios = require('axios');
const fs = require('fs');
const createMapper = require('./create-fields-tree');
import createFieldSpec from '../create-fields-specs';
import npmsMap from "../../_archive/npms-map";

const sampleDataFile = '/home/vianney/dev/idea/npmvs/tmp/react.json';

// const sampleDataUrl = 'https://api.npms.io/v2/package/react';
//
// async function main() {
//   const resp = await axios.get(sampleDataUrl);
//   const sampleDataStr = JSON.stringify(resp.data, null, 2);
//   fs.writeFileSync(sampleDataFile, sampleDataStr);
//   return sampleDataStr;
// }
const fieldsSpecs = createFieldSpec(npmsMap);
const mapper = createMapper(fieldsSpecs);

async function main() {
  const sampleData = JSON.parse(fs.readFileSync(sampleDataFile, {encoding: 'utf8'}));
  
}
main().then(console.log).catch(console.log);