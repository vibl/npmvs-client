import size from "lodash/size";
import mem from 'mem';
import {add,  apply, dec, divide, filter, ifElse, juxt, last,
  length, map, multiply, pipe, product, prop, props,
  reduce, round, slice, split, splitAt, sum, toPairs, values, unlessEmpty} from 'ramda';
const {concatLeft, curry2, geoMean, getDotPath, ident, ifDefinedElse,
  nthRoot, percent, pipeDebug, splitPipe} = require('../vibl-pure');

const significantDigits = curry2(
  (digits, n) =>
    n >= 10**digits
      ? Math.round(n).toString()
      : Number.parseFloat(n).toPrecision(digits)
);
const percentGrowth = pipe(dec, multiply(100));
const percent1dec = percent(1);
const percent2dec = percent(2);

const thousands = n => significantDigits(2, n/1000).toString() + 'k';

const growthSeries = (series) => {
  let i,
    growth,
    acc = [],
    n = series.length;
  for(i=1;i<n;i++) {
    growth = series[i-1] === 0 ? 1 : series[i]/series[i-1];
    acc.push(growth);
  }
  return acc;
};
const acceleration = pipe(
  growthSeries,
  growthSeries,
  geoMean,
);
const fns = {
  acceleration,
  ident,
  none: () => undefined,
  joinComma: ary => ary.join(", "),
  count: val => size(val),
  author: getDotPath('name'), // (o) => o && o.name,
  publisher: getDotPath('username'), // (o) => o && o.username,
  repository: getDotPath('url'), // (o) => o && o.url,
  releases: getDotPath('3.count'), //(a) => a && a[3] && a[3].count,
  downloads: getDotPath('5.count'), // (a) => a[5] && a[5].count,
  commits6months: getDotPath('3.count'), // (a) => a[4] && a[4].count,
  commits12months: getDotPath('4.count'), // (a) => a[4] && a[4].count,
  closedIssuesRatio: ({count, openCount}) => (count - openCount) / count * 100,
  linters: getDotPath('js.0'), // (o) => o && o.js && o.js[0],
  shorten20chars: str => str.slice(0, 20),
  percent: n => Math.round(n * 100).toString() + "%",
  hoursFromSeconds: n => Math.round(n / 3600),
  thousands,
  significantDisplay: significantDigits(2),
      // Number of contributors who have contributed 80% of the commits.
  paretoContributors: list => {
    const first = list.shift().commitsCount;
    // Accumulate sums of commits.
    const sums = list.reduce( (acc, o) => [...acc, last(acc) + o.commitsCount], [first]);
    const total = last(sums);
    // Count contributors until 80% of commits are reached.
    return sums.reduce( (acc, val) => val/total <= 0.8 ? acc + 1 : acc, 0);
  },
  contributorsWithMoreThan2commits: list => {
    return list.filter( o => o.commitsCount > 2 ).length
  },
  contributorsCount: length,
  averageOpenIssueDuration: dist => {
    const issuesCount = sum(values(dist));
    const averageReducer = (acc, pair) => acc + parseInt(pair[0]) * pair[1];
    const total = pipe(
      toPairs,
      reduce(averageReducer, 0)
    )(dist);
    const averageSeconds = total / issuesCount;
    const averageDays = Math.round(averageSeconds / 3600 / 24 * 10) / 10;
    return averageDays;
  },
  percentGrowth,
  percentIssuesClosedIn3daysOrLess: (issues) => {
    const {distribution: dist} = issues;
    let lessThan3daysCount = 0, totalCount = 0, seconds;
    for(seconds in dist) {
      const issues = parseInt(dist[seconds]);
      totalCount += issues;
      const days = parseInt(seconds) / 3600 / 24;
      if( days < 3.5 ) {
        lessThan3daysCount += issues;
      }
    }
    return Math.round(lessThan3daysCount / totalCount * 100);
  },
  agreggateDownloadsData: (period, data) => {
    const res = [];
    let count = 0, acc = 0;
    for( let obj of data ) {
      count++;
      acc += obj.downloads;
      if( count === period ) {
        res.push(acc);
        acc = 0;
        count = 0;
      }
    }
    return res;
  },
  downloadsAverageGrowth: pipe(
      map(prop('downloads')),
      juxt([
        slice(0, 28),
        slice(-28, Infinity)
      ]),
    map(sum),
    ([a,b]) => b/a,
    percentGrowth,
  ),
  downloadsAcceleration: pipe(acceleration, percentGrowth),
  significanPercentDisplay: pipe(significantDigits(2), concatLeft('%')),
  percent1dec: percent(1),
  percent2dec: percent(2),
};

const orNull = f => arg => f(arg) || null;

export const fn = pipe(
  map(orNull),
  map(mem),
)(fns);

export default ifDefinedElse(splitPipe(fns), ident) ;