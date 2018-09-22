import React, {Component} from 'react';
import l from '../../logic/localiz';
import {connectStatePure, mem} from '../../logic/utils';
import ChartCard from '../card/ChartCard';
import Divchart from './Divchart/DivchartContainer';
import ChartTitle from '../card/ChartTitle';
import BlinkSlider from '../card/BlinkSlider';
const {transposeKeys} = require('../../logic/vibl-fp');

const description = `
Contributors with one or two commits are not usually much involved in maintaining the project. 

However, their number can skew the total count of contributors by a large margin. The number 2 is pretty arbitrary, 
but it already cuts the number by half or more in some cases. We might change it later.

In a future version of NPMvs, we will use *additions* (i.e. lines of code) to the project, as a better measure
 of contribution.
<>
Les contributeurs avec un ou deux commits ne sont généralement pas très impliqués dans le projet.
`;
export const config = {
  dataPoint: 'contributors',
  extractFn: x => x,
  description,
};

const SliderTitle = ({description, displayValue, value, onChange, sliderConfig}) => {
  const valueSlider = <BlinkSlider
    {...{value, displayValue, onChange, sliderConfig, popupStyle: {width: '5rem'}}}/>
  return (
    <ChartTitle {...{description: l(description)}}>
      {l`Contributors with more than <>Contributeurs avec plus de`} {valueSlider} commits
    </ChartTitle>
  )
};
class Contributors extends Component {
   constructor(props) {
     super(props);
     this.state = {
       exponent: 1,
     }
   }
  onChange = (event, value) => {
     this.setState({exponent: value});
  };
  render() {
    const {description} = config;
    const {onChange, props:{data}, state:{exponent}} = this;
    if( ! data ) return null;
    const thisData = transposeKeys(data);
    const minCommits = 2 ** exponent;
    const sliderConfig = {min: 0, max: 10, step: 1};
    return (
      <ChartCard>
        <SliderTitle {...{description: l(description), value: exponent, displayValue: minCommits, onChange, sliderConfig}}/>
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