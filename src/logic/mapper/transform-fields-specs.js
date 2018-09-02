const {assoc, map} = require('ramda');
const transformLiteralFile = require('./transform-literal-file');
// const {transform} = require('../vibl-pure');

const file = '/home/vianney/dev/idea/npmvs/src/logic/fields-specs.js';
// const transformation = transform(spec);
const transformation = map(assoc('bla', 'hello'));
transformLiteralFile(file, transformation);

