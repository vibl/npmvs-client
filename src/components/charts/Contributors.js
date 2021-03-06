import React, {Component} from 'react';
import l from '../../util/localiz';
import {connectStatePure, mem} from '../../util/utils';
import ChartCard from '../card/StyledChartCard';
import Divchart from './Divchart/DivchartContainer';
import SliderTitle from '../card/SliderTitle';
const {transposeKeys} = require('../../util/vibl-fp');

const infotip = `
Contributors with one or two commits are not usually much involved in maintaining the project. 
However, their number can skew the total count of contributors by a large margin.

In a future version of NPMvs, we will use *additions* (i.e. lines of code) to the project, as a more accurate
 measure of contribution.
<>
Les contributeurs avec un ou deux commits ne sont généralement pas très impliqués dans le projet, mais
ils peuvent représenter une large part des contributeurs.

Dans une future version de NPMvs, nous utiliserons les *ajouts* (i.e. lignes de codes) au projet
comme mesure plus pertinente de la contribution.
`;
export const config = {
  dataPoint: 'contributors',
  extractFn: x => x,
  infotip,
};
class Contributors extends Component {
  onChange = (event, state) => {
     this.props.setState(state);
  };
  render() {
    const {infotip} = config;
    const {onChange, props:{data, state}} = this;
    if( ! data ) return null;
    const thisData = transposeKeys(data);
    const minCommits = 2 ** state;
    const sliderConfig = {min: 0, max: 9, step: 1};
    return (
      <ChartCard>
        <SliderTitle {...{
          textBeforeBlinker: l`Contributors with more than <>Contributeurs avec plus de`,
          textAfterBlinker: 'commits',
          infotip: l(infotip),
          value: state,
          displayValue:minCommits,
          sliderConfig,
          sliderWidth: '8rem',
          onChange}}/>
        <Divchart  {...{config, data: thisData[minCommits]}}/>
      </ChartCard>
    );
  };
}
const selectorFn = mem( (data) => {
  const min = 0, max = 10;
  let acc = {};
  const {contributors} = data;
  if ( ! contributors) return null;
  for (let i = min; i < max; i++) {
    const minCommits = 2 ** i;
    if( ! acc[minCommits] ) acc[minCommits] = {};
    const list = contributors.filter(o => o.commitsCount > minCommits);
    acc[minCommits] = list.length;
  }
  return acc;
});
export default connectStatePure(Contributors, selectorFn);