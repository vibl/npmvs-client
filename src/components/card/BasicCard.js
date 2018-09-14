import React from 'react';
import ChartCard from './ChartCard';
import BarChart from '../charts/BarChart/BarChartContainer';
import ChartTitle from './ChartTitle';
import {pure} from 'recompose';

const BasicCard = ({config, data}) => {
  const {label, description} = config;
  return (
    <ChartCard>
      <ChartTitle {...{description}}>{label}</ChartTitle>
      <BarChart  {...{config, data}}/>
    </ChartCard>
  );
};
export default pure(BasicCard);

