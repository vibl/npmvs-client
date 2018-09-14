import React from 'react';
import {pure} from 'recompose';
import {slice} from "ramda";
import ChartCard from '../card/ChartCard';
import Title from '../card/ChartTitle';
import InfoTip from '../card/InfoTip';
import LineChart from "./LineChart/LineChartContainer";

const description = `
Values are adjusted for average month duration.

In other words, this chart displays what monthly downloads would be if each month lasted 30.41 days (365/12).

This is to avoid displaying variations merely due to month durations (30, 31 or 28).
`;

const averageDaysInMonth = 365/12;

const adjustForMonthDuration = (days, n) => Math.round(n / days * averageDaysInMonth);

const extractFn = (downloads) => {
  const result = [];
  const data = downloads.slice(-365);
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
export const config = {
  label: 'Monthly downloads in the last year',
  dataPoint: 'downloads',
  extractFn,
  description,
};

const ThisCard = ({data}) => {
  const {label, description} = config;
  return (
    <ChartCard style={{height: 'calc(100% - 24px)'}}>
      <Title>{label}<InfoTip {...{description}}/></Title>
      <LineChart  {...{config, data}}/>
    </ChartCard>
  );
};
export default pure(ThisCard);