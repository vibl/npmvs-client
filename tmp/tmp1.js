const {dissoc, flip, reduce, reduceRight} = require('ramda');
const {curry3} = require('../src/logic/vibl-fp');

// const reduceSteps = (fn, ary, obj) => ary.reduce( (acc, val) => fn(val, acc), obj );


// const reduceSteps = curry3( (fn, ary, obj) => reduce(flip(fn), obj, ary) );

const reduceSteps = (fn, ary, obj) => reduceRight(fn, obj, ary);

const dissocAll = reduceSteps(dissoc);

const out = dissocAll(['a', 'b'], {a:1, b:2, c:3});
console.log(out);
