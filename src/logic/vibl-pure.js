function _i(required) {
  return required && "object" === typeof required && "default" in required ? required.default : required;
}
const _ = _i(require('lodash'));
const R = _i(require('ramda'));
const RS = _i(require('ramdasauce'));
const pMapOrig = _i(require('p-map'));
const deepEql = _i(require("deep-eql"));
const {
  F, T, addIndex, append, apply, assoc, assocPath, binary,
  chain, clone, complement, concat, cond, curry, curryN,
  difference, dissoc, drop, evolve, filter, flatten, flip, forEachObjIndexed,
  identity, ifElse, infinity, intersection, intersperse, isEmpty,
  juxt, keys, length, lensPath, 
  map, match, max, merge, mergeAll, mergeDeepRight, mergeDeepWith, nth,
  objOf, or, path, pick, pipe, prepend,
  range, reduce, replace,
  slice, sort, split, tap, toPairs, trim, unapply, values, without, zip, zipObj, zipWith
} = R;

const {
  isArray, isFunction, isNumber, isUndefined,
  isObject, isArrayLike, isObjectLike, isPlainObject, isString, random, toNumber
} = _;


/**
 * Generates a range of numbers.
 *
 * This function is curried.
 *
 * @since v1.0.0
 * @sig Number a -> a -> a -> [a]
 * @param {Number} (step) How much to step by.
 * @param {Number} (start) Where to start.
 * @param {Number} (stop) When to stop.
 * @return {Array} The array of numbers
 * @example
 * RS.rangeStep(2, 2, 10) //=> [2, 4, 6, 8, 10]
 */
const rangeStep = curry((step, start, stop) => {
  if (step === 0) return null;
  if (step > 0 && stop < start) return null;
  if (step < 0 && stop > start) return null;
  return map(n => start + step * n, range(0, 1 + (stop - start) / step >>> 0));
});

// RamdaSauce README
// // --- Conversions ---
// RS.toDate(1e12)             // a Number to a date Object
// RS.toNumber('5')            // a String to a Number
//
// // --- Object Shenanigans ---
// const x = {a: 1, b: 2, c: {x: [5, 6]}}
// RS.mapKeys(R.toUpper, x)    // transforms the keys of an object by the function
// RS.dotPath('c.x.0', x)      // fetches a value from a nested object by a string path
//
// // --- Generating Things ---
// RS.rangeStep(2, 2, 10)      // generates a range of numbers with a step
//
// // --- Finding Things ---
// RS.findByProp('id', 'a', [{id: 'a', id: 'b'}])      // finds an object by propEq
// RS.findIndexByProp('id', 'a', [{id: 'a', id: 'b'}]) // finds the index of an object by propEq
//
// // --- Predicates ---
// RS.isUndefined(qwerty)      // check if something is undefined
// RS.isNotNil(null)           // check if something is not null or undefined
// RS.isNilOrEmpty(null)       // checks if something is null, undefined or R.isEmpty
// RS.isWithin(1, 2, 2)        // is the 3rd parameter within the range of 1st through 2nd?
// RS.isNotWithin(1, 2, 100)   // is the 3rd parameter not within the range of 1st through 2nd?
// RS.eqLength([1,2,3], 'abc') // tests 2 things to see if their length properties are the same

/*
  See also for inspiration:
  https://github.com/ramda/ramda/wiki/Cookbook
  https://github.com/Cottin/ramda-extras/blob/master/src/ramda-extras.coffee
  https://github.com/mediasuitenz/ramda-extended/blob/master/src/ramda-extended.js

  https://github.com/ramda/ramda/wiki/What-Function-Should-I-Use%3F
 */

const isBlank = val => ! val || isEmpty(val);
const notBlank = complement(isBlank);

const notEmpty = complement(isEmpty);
const notMatch = pipe(match, isEmpty);

const concatArray = chain(identity);
const curryFlip = fn => curry2(flip(fn));

const curry2 = curryN(2);
const curry3 = curryN(3);

const concatLeft = flip(concat);
const mergeLeft = flip(merge);

// Store a value into a variable, which can be an object or an array.
const store = dest => source => {
  if (isObjectLike(dest)) {
    Object.assign(dest, source);
  }
  if (isArrayLike(dest)) {
    source.forEach(val => dest.push(val));
  }
  return source;
};

const interleave = pipe(zip, flatten);

const mapIf = curryN(3, (testFn, mapFn, obj) => {
  const testAndMapFn = x => testFn(x) ? mapFn(x, obj) : x;
  let newObj = {};
  for (let prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      newObj[prop] = testAndMapFn(obj[prop]);
    }
  }
  return newObj;
});
const bindAll = mapIf(isFunction, (fn, obj) => fn.bind(obj));
const filterKeys = curry2((condition, obj) => {
  const newObj = clone(obj);
  for (let key in obj) {
    if (newObj.hasOwnProperty(key)) {
      if (condition(key).length === 0) {
        delete newObj[key];
      }
    }
  }
  return newObj;
});

const flipAll = mapIf(isFunction, flip);

const bindAllDeep = obj => {
  const objClone = clone(obj);
  const firstLevelBound = bindAll(objClone);
  return mapIf(isPlainObject, bindAll, firstLevelBound);
};
/*
 Logs and returns a value.
 */
const log = (msg) => tap( val => console.log('TAP LOGGING: "', msg, '"', val));
/*
 Used in R.pipe and R.pipeP, logs every step of the pipe
 */
const logEach = intersperse(log);

const pipeLog = (...args) => {
  const newArgs = logEach(args);
  return pipe(...newArgs);
};

const rangeMap = (step, start, end, fn) => {
  const range = RS.rangeStep(step, start, end);
  return map(fn, range);
};
const mapIndex = addIndex(map);
const trimIfString = mapIf(isString, trim);

const mapDeep = curry2((fn, obj) => {
  const deep = value => {
    if (typeof value === 'object') {
      return mapDeep(fn, value);
    } else {
      return fn(value);
    }
  };
  return map(deep, obj);
});

const mapKeys = fn => obj => {
  const newObj = {};
  forEachObjIndexed((val, key) => newObj[fn(key)] = val)(obj);
  return newObj;
};

const pickValues = keys => pipe(pick(keys), values);

const preIntersperse = curry2((element, list) => pipe(intersperse(element), prepend(element))(list));
const splitLinesTrim = pipe(trim, split('\n'), map(trim));

function toIntIfNumber(val) {
  return isNaN(val) ? val : parseInt(val);
}

const dotStringToPath = pipe(split('.'), map(toIntIfNumber));
// Accepts dot-separated strings as path, or an array of dot-separated strings.
let dotPath;
dotPath = cond([
  [Array.isArray, pipe(chain, dotPath)],
  [_.isString, dotStringToPath]
]);

const lensDotPath = pipe(dotPath, lensPath);

const assocDotPath = curry3((path, val, obj) => assocPath(dotPath(path), val, obj));

const getDotPath = curry2( (str, obj) => path(dotPath(str), obj) );

const overlaps = pipe(intersection, notEmpty);

const equalsAny = curry2((ary, val) => {
  for (let i = 0; i < ary.length; i++) {
    if (Object.is(ary[i], val)) {
      return true;
    }
  }
  return false;
});
const prefixLine = replace(/^ */mg);
const appendStr = curry2((suffix, str) => str + suffix);
const lineBreaksToSpace = replace(/\n/g, ' ');

const removeShortest = pipe(sort((a, b) => a.length - b.length), drop(1));
const get = flip(nth);

const doesMatch = regex => pipe(match(regex), notEmpty);

const splitProperties = pipe(toPairs, map(apply(objOf)));

const rest = slice(1, Infinity);

const reduceFirst = curry2((fn, arr) => arr.reduce(fn));

const combine = curry2((arrA, arrB) => {
  let res = [];
  arrA.forEach(a => arrB.forEach(b => res.push([a, b])));
  return res;
});

const filterIndexed = addIndex(filter);

const filterP = (promiseFn) => async (list) => {
  const tests = await Promise.all(map(promiseFn, list));
  return filterIndexed((item, i) => tests[i])(list);
}
const reduceP = (fn, acc) => async (list) => {
  const len = list.length;
  for (let i = 0; i < len; i++) {
    acc = await fn(acc, list[i]);
  }
  return acc;
};

const reduceFirstP = curry2((fn, list) => reduceP(fn, list[0])(rest(list)));

const reverseDifference = flip(difference);

const mergeDeepWithArray = mergeDeepWith((left, right) => isArray(left) && isArray(right) ? [...left, ...right] : right);

const fnOr = curry2((fn1, fn2) => (...args) => fn1(...args) || fn2(...args));

const from = (n) => slice(n, infinity);

var takeLastUntil = curry2((fn, list) => {
  var i = list.length - 1;
  while (i >= 0 && !fn(list[i])) {
    i -= 1;
  }
  if (i === -1) i = 0;
  return slice(i, Infinity, list);
});

const toPairsSorted = curry2((arr, obj) => {
  let res = [];
  arr.forEach(key => res.push([key, obj[key]]));
  const firstKeys = intersection(arr, keys(obj));
  const otherKeys = difference(arr, keys(obj));
  //TODO Finish
});

// fn has signature: (acc, currentValue, currentIndex, arr)
const reduceIndexed = curry3((fn, initialValue, arr) => arr.reduce(fn, initialValue));

// Put the first argument of a 3 arguments function as the last argument.
const budge = (fn) => curry3((...args) => {
  args.unshift(args.pop());
  return fn(...args);
});
// Map over promises concurrently (By Sindre Sorhus)
const pMap = budge(pMapOrig);

const keep = curry2((list, arr) => {
  const res = [];
  list.forEach(n => res.push(arr[n]))
});
const randomList = (len, ...args) => {
  const res = [];
  for (let i = 0; i < len; i++) {
    res.push(random(...args));
  }

  return res;
};
const keepRandom = curry2((n, arr) => randomList(n, 0, arr.length - 1).map(i => arr[i]));

const equals = curry2(deepEql);
// Transform an object according to specifications, which are provided with another
// object with a similar structure and only new value and functions (applied to old values)
// Ex: transform({a: 1, b: {c: inc}}, {a:"bye", d:42, b:{c:7}}) === {a:1, d:42, b:{c:8}}
const transform = curry2( (spec, obj) => {
  const res = {};
  let key, objVal, specVal, specType;
  for( key in obj ) res[key] = obj[key];
  for( key in spec ) {
    specVal = spec[key];
    objVal = obj[key];
    specType = typeof specVal;
    res[key] = specType === 'function'
      ? specVal(objVal)
      : specType === 'object' && typeof objVal === 'object' && ! isArrayLike(objVal)
        ? transform(specVal, objVal)
        : specVal;
  }
  return res;
});
// Check if all arguments are equals.
const allEquals = (...args) => args.every( arg => arg === args[0]);
// Merges tables (arrays of objects).
const mergeAllTables = reduceFirst(zipWith(merge));
// `unapply` takes a function which takes a single array argument, and returns a function which
// takes any number of positional arguments and passes these arguments as an array.
// `binary` wraps a function of any arity (including nullary) in a function that accepts exactly 2 parameters.
const mergeTables = binary(unapply(mergeAllTables));

const mergeAllTablesNotBlank = pipe(
  filter(notBlank),
  mergeAllTables,
);
const mergeTablesNotBlank = curry2( (t1, t2) => mergeAllTablesNotBlank([t1, t2]) );

// Removes an element from an array.
const discard = curry2( (val, list) => without([val], list) );
// Make a table (array of objects) out of an array, with the key provided as a first argument.
const tablify = curry( (key, obj) =>
  map(objOf(key), obj)
);
// Returns a function that applies arguments to several functions and returns an array of results.
const collect = unapply(juxt);

const updateWhere = curry3( (fn, where, list) => list.map( val => where(val) ? fn(val) : val ) );

const reduceSteps = curry3( (fn, ary, obj) => reduce(flip(fn), obj, ary) );

const dissocAll = reduceSteps(dissoc);

// Reverses the arguments as compared to`difference`.
const added = (b, a) => difference(a, b);
const removed = flip(added);
// Probably not useful: reduces legibility and lacks flexibility.
// const collectFilterMap = pipe(
//   map( fns => pipe(fns[0], map(fns[1])) ),
//   juxt,
// );
const putFirst = curry2( (element, list) => pipe(discard(element), prepend(element))(list) );

const listMax = apply(Math.max);

const zipObjMap = curry2( (fn, list) => zipObj(list, map(fn, list)) );

const viblPure = {
  added, allEquals, appendStr, assocDotPath,
  bindAll, bindAllDeep, budge,
  collect, combine, concatArray, concatLeft, curry2, curry3, curryFlip,
  discard, dissocAll, doesMatch, dotPath, dotStringToPath, equals, equalsAny,
  fnOr, filterKeys, filterP, flipAll, from,
  get, getDotPath,
  interleave, isBlank, isFunction, isNumber, isObject, isObjectLike, isPlainObject, isString,
  keep, keepRandom,
  lensDotPath,  lineBreaksToSpace, listMax, log, logEach,
  mapDeep, mapIf, mapIndex, mapKeys, mergeDeepWithArray, mergeLeft,
  mergeAllTables, mergeAllTablesNotBlank, mergeTables, mergeTablesNotBlank,
  notBlank, notEmpty, notMatch,
  overlaps,
  pickValues, pipeLog, pMap, prefixLine, preIntersperse, putFirst,
  random, rangeMap, rangeStep, reduceFirst, reduceFirstP, reduceIndexed, reduceP,
  reduceSteps, removed, removeShortest, rest, reverseDifference,
  splitLinesTrim, splitProperties, store,
  tablify, takeLastUntil, toNumber, toPairsSorted, transform, trimIfString,
  updateWhere,
  zipObjMap,
};

module.exports = viblPure;
