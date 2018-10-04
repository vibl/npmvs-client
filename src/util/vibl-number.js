import size from "lodash/size";
import {dec, length,multiply, pipe} from 'ramda';
const {concatLeft, curry2, ident, percent} = require('./vibl-fp');

const significantDigits = curry2(
  (digits, n) => {
    let x = Math.round(n) >= 10 ** digits
      ? Math.round(n).toString()
      : Number.parseFloat(n).toPrecision(digits)
    return x.replace(/\.0+$/, '');
  }
);
const percentGrowth = pipe(dec, multiply(100));

const thousands = n => significantDigits(2, n/1000) + 'k';
const millions = n => significantDigits(2, n/1000000) + 'M';

const humanNumber =
    n =>
      n >= 1000000
        ? millions(n)
        : n >= 1000
          ? thousands(n)
          : n;

const fns = {
  explicitPlus: str => parseFloat(str) > 0 ? '+' + str : str,
  ident,
  none: () => undefined,
  count: val => size(val),
  humanNumber,
  millions,
  percent: n => Math.round(n * 100).toString() + "%",
  hoursFromSeconds: n => Math.round(n / 3600),
  thousands,
  significantDisplay: significantDigits(2),
  contributorsCount: length,
  percentGrowth,
  significanPercentDisplay: pipe(significantDigits(2), concatLeft('%')),
  percent1dec: percent(1),
  percent2dec: percent(2),
};

export default fns;