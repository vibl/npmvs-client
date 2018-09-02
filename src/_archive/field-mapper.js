import mem from 'mem';
import size from "lodash/size";
import {add, assoc, difference, dissoc, insert, last,
  map, mapObjIndexed, mergeDeepLeft, pipe, reduce, toPairs, values} from 'ramda';

export const ident = val => val;
export const none = () => undefined;
export const joinComma = ary => ary.join(", ");
export const count = val => size(val);

const mapperFn = {
  ident: val => val,
  none: () => undefined,
  joinComma: ary => ary.join(", "),
  count: val => size(val),
  author: (o) => o.name,
  publisher: (o) => o.username,
  repository: (o) => o.url,
  releases: (a) => a[3].count,
  downloads: (a) => a[5].count,
  commits: (a) => a[4].count,
  linters: (o) => o.js && o.js[0],
  // Number of contributors who have contributed 80% of the commits.
  paretoContributors: list => {
    const first = list.shift().commitsCount;
    // Accumulate sums of commits.
    const sums = list.reduce( (acc, o) => [...acc, last(acc) + o.commitsCount], [first]);
    const total = last(sums);
    // Count contributors until 80% of commits are reached.
    return sums.reduce( (acc, val) => val/total <= 0.8 ? acc + 1 : acc, 0);
  },
  averageOpenIssueDuration: dist => {
    const issuesCount = reduce(add)(dist);
    const averageReducer = (acc, pair) => acc + parseInt(pair[0]) * pair[1];
    const total = pipe(
      toPairs,
      reduce(averageReducer, 0)
    )(dist);
    const averageSeconds = total / issuesCount;
    const averageHour = Math.round(averageSeconds / 3600);
    return averageHour;
  }
};

const mapRecurse = parent => data => {
  let result = {};
  let fn, key, node;
  for (key in parent) {
    node = parent[key];
    fn = node.rawFn;
    if( fn && typeof fn === 'function' ) {
      result[node.id] = fn(data[key]);
    } else {
      result = {...result, ...mapRecurse(node)(data[key])};
    }
  }
  return result;
};
export const fieldMapper = mem(mapRecurse);