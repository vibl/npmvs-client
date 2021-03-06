import React from 'react';
import ChartCard from './StyledChartCard';
import Divchart from '../charts/Divchart/DivchartContainer';
import Title from './ChartTitle';
import {pure} from 'recompose';
import l from '../../util/localiz';

const BasicCard = ({title, infotip, displayFn, data}) => {
  return (
    <ChartCard>
      <Title {...{infotip}}>{l(title)}</Title>
      <Divchart  {...{data, displayFn}}/>
    </ChartCard>
  );
};
export default pure(BasicCard);

