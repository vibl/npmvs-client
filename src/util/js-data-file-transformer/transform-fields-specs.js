const {assoc, has, filter, map} = require('ramda');
const transformLiteralFile = require('./transform-literal-file');
// const {transform} = require('../vibl-pure');

const file = '/home/vianney/dev/idea/npmvs/src/logic/source_npms.js';

const filterFn = o => o.displayFn !== 'none';
const transformation = filter(filterFn);

// const mapFn = o => ({
//   id: o.id,
//   name: o.name,
//   source: o.source,
//   path: o.path,
//   rawFn: 'ident',
//   displayFn: o.process.name,
//   widget: undefined,
// });
// const transformation = map(mapFn);
// const transformation = transform(spec);
transformLiteralFile(file, transformation);

