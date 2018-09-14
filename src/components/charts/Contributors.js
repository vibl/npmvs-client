import React, {Component} from 'react';
import { Fade, Loop } from 'react-animation-components';
import {filter, length, map, pipe} from 'ramda';
import ChartCard from '../card/ChartCard';
import BarChart from './BarChart/BarChartContainer';
import ChartTitle from '../card/ChartTitle';
import PopSlider from "../card/PopSlider";

 /*
<Loop in iterations={5.5}>
  <Fade>
    <h1>I will Fade in and out repeatedly on 500ms intervals 5.5 times</h1>
  </Fade>
</Loop>*/

const description = `
Contributors with one or two commits are not usually much involved in maintaining the project. 

However, their number can skew the total count of contributors by a large margin. The number 2 is pretty arbitrary, 
but it already cuts the number by half or more in some cases. We might change it later.

In a future version of NPMvs, we will use *additions* (i.e. lines of code) to the project, as a better measure
 of contribution.
`;
export const config = {
  dataPoint: 'contributors',
  extractFn: x => x,
  description,
};
const ValueSlider = ({value, onChange}) => (
  <PopSlider min={0} max={200} step={1} {...{value, onChange}}>
    <Loop in interval={700}>
      <Fade
        enterOpacity={1}
        exitOpacity={0.4}
        style={{display: 'inline', color: '#000'}}
        timingFn="ease-out"
      >
        {value}
      </Fade>
    </Loop>
  </PopSlider>
);
const SliderTitle = ({description, value, onChange}) => {
  return (
    <ChartTitle {...{description}}>
      Contributors with more than&nbsp;<ValueSlider {...{value, onChange}}/> commits
    </ChartTitle>
  )
};
class Contributors extends Component {
   constructor(props) {
     super(props);
     this.state = {
       minCommits: 2,
     }
   }
  onChange = (event, value) => {
     this.setState({minCommits: value});
  };
  render() {
    const {description} = config;
    const {onChange, props:{data: list}, state:{minCommits}} = this;
    const data =
      map(
        pipe(
          filter( o => o.commitsCount > minCommits ),
          length,
        ),
        list,
      );

    return (
      <ChartCard>
        <SliderTitle {...{description, value: minCommits, onChange}}/>
        <BarChart  {...{config, data}}/>
      </ChartCard>
    );
  };
}
export default Contributors;