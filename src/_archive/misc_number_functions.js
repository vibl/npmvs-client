import {mem} from "../util/utils";

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
const buildupSeries = (series) => {
  let i,
    growth,
    acc = [],
    n = series.length;
  for(i=1;i<n;i++) {
    growth = series[i-1] === 0 ? 1 : series[i] - series[i-1];
    acc.push(growth);
  }
  return acc;
};
const acceleration = pipeD(
  growthSeries,
  buildupSeries,
  mean,
);
monthlyAggregate: mem( (data, packId) => {
  if( ! data ) return null;
  const result = [];
  const getMonth = slice(0, 7);
  const lastDay = last(data).day;
  let currentMonth,
    acc = 0,
    daysCount = 0,
    previous = getMonth(data[0].day);
  for( const {day, downloads} of data ) {
    currentMonth = getMonth(day);
    if( currentMonth !== previous || day === lastDay ) {
      result.push({month: previous, value: Math.round(acc / daysCount * 365/12)});
      acc = 0;
      daysCount = 0;
    }
    acc += downloads;
    daysCount++;
    previous = currentMonth;
  }
  return result;
}),
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
  // Number of contributors who have contributed 80% of the commits.
  paretoContributors: list => {
  const first = list.shift().commitsCount;
  // Accumulate sums of commits.
  const sums = list.reduce( (acc, o) => [...acc, last(acc) + o.commitsCount], [first]);
  const total = last(sums);
  // Count contributors until 80% of commits are reached.
  return sums.reduce( (acc, val) => val/total <= 0.8 ? acc + 1 : acc, 0);
},
