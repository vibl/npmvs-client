import React from 'react';
import ChartCard from './ChartCard';
import BarChart from '../charts/BarChart/BarChartContainer';
import Title from './Title';
import InfoTip from './InfoTip';
import {pure} from 'recompose';

const BasicCard = ({config, data}) => {
  const {label, description} = config;
  return (
    <ChartCard>
      <Title>{label}<InfoTip {...{description}}/></Title>
      <BarChart  {...{config, data}}/>
    </ChartCard>
  );
};
export default pure(BasicCard);

