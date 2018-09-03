import size from "lodash/size";
import {add, filter, last,map, pipe, reduce, toPairs} from 'ramda';
const {getDotPath} = require('../vibl-pure');

const twoSignificantDigits = n => n >= 100 ? Math.round(n).toString() : Number.parseFloat(n).toPrecision(2);
const thousands = n => twoSignificantDigits(n/1000).toString() + 'k';

export default {
  ident: val => val,
  none: () => undefined,
  joinComma: ary => ary.join(", "),
  count: val => size(val),
  author: getDotPath('name'), // (o) => o && o.name,
  publisher: getDotPath('username'), // (o) => o && o.username,
  repository: getDotPath('url'), // (o) => o && o.url,
  releases: getDotPath('3.count'), //(a) => a && a[3] && a[3].count,
  downloads: pipe(getDotPath('5.count'), thousands), // (a) => a[5] && a[5].count,
  commits: getDotPath('4.count'), // (a) => a[4] && a[4].count,
  linters: getDotPath('js.0'), // (o) => o && o.js && o.js[0],
  shorten20chars: str => str.slice(0, 20),
  percent: n => Math.round(n * 100).toString() + "%",
  thousands,
  twoSignificantDigits,
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