import React from 'react';
import ChartCard from './ChartCard';
import Divchart from '../charts/Divchart/DivchartContainer';
import Title from './ChartTitle';
import {pure} from 'recompose';

const BasicCard = ({config, data}) => {
  const {label, description, displayFn} = config;
  return (
    <ChartCard>
      <Title {...{description}}>{label}</Title>
      <Divchart  {...{data, displayFn}}/>
    </ChartCard>
  );
};
export default pure(BasicCard);

