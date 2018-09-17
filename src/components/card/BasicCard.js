import React from 'react';
import ChartCard from './ChartCard';
import Divchart from '../charts/BarChart/DivchartContainer';
import ChartTitle from './ChartTitle';
import {pure} from 'recompose';

const BasicCard = ({config, data}) => {
  const {label, description, displayFn} = config;
  return (
    <ChartCard>
      <ChartTitle {...{description}}>{label}</ChartTitle>
      <Divchart  {...{data, displayFn}}/>
    </ChartCard>
  );
};
export default pure(BasicCard);

