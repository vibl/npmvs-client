import React from 'react';
import ChartCard from './ChartCard';
import Divchart from '../charts/Divchart/DivchartContainer';
import Title from './ChartTitle';
import {pure} from 'recompose';
import l from '../../util/localiz';

const BasicCard = ({title, description, displayFn, data}) => {
  return (
    <ChartCard>
      <Title {...{description}}>{l(title)}</Title>
      <Divchart  {...{data, displayFn}}/>
    </ChartCard>
  );
};
export default pure(BasicCard);

