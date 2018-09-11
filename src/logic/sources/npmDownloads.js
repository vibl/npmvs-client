import {dissoc, map, slice} from "ramda";
import config from '../../config'
import fns from '../mapper/field-fns';
import fields from '../data-fields';
const {mergeTablesNotBlank, tablify, zipObjMap} = require('../vibl-pure').default;

const makeUrlBuilder =
  endpoint =>
    (packName, {timeFrame}) =>
      config.sources.npmDownloads + endpoint + '/' + timeFrame + '/' + encodeURIComponent(packName);

const urlBuilder = zipObjMap(makeUrlBuilder, ['range', 'point']);

const averageDaysInMonth = 365/12;

const adjustForMonthDuration = (days, n) => Math.round(n / days * averageDaysInMonth);

const getMonthlyDownloads = (data) => {
  const result = [];
  const getMonth = slice(0, 7);
  let currentMonth,
    acc = 0,
    daysCount = 0,
    previous = getMonth(data[0].day);
  for( const {day, downloads} of data ) {
    currentMonth = getMonth(day);
    if( currentMonth !== previous ) {
      result.push({month: currentMonth, value: adjustForMonthDuration(daysCount, acc)});
      acc = 0;
      daysCount = 0;
    }
    acc += downloads;
    daysCount++;
    previous = currentMonth;
  }
  return result;
};

const stateTransformer = {
  adding: (packId, data) => {
    const monthlyDownloads = getMonthlyDownloads(data.downloads.slice(-365));
    const downloadsAverageGrowth = fns(fields.downloadsAverageGrowth.computeFn)(data.downloads);
    const downloadsAcceleration = fns(fields.downloadsAcceleration.computeFn)(data.downloads);
    return {
      charts: {
        monthlyDownloadsSeries: {[packId]: monthlyDownloads},
        downloadsAverageGrowth: {[packId]: downloadsAverageGrowth},
        downloadsAcceleration: {[packId]: downloadsAcceleration},
      },
    };
  },
  removing: (packName) => ({
    charts: {monthlyDownloadsSeries: map(dissoc(packName))},
  }),
};
export default {
  stateTransformer,
  urlBuilder,
};