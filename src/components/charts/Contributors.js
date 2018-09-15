import React, {Component} from 'react';
import mem from 'mem';
import {filter, length, map, pipe} from 'ramda'
import ChartCard from '../card/ChartCard';
import BarChart from './BarChart/BarChartContainer';
import ChartTitle from '../card/ChartTitle';
import BlinkSlider from '../card/BlinkSlider';

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
const extractData =
  mem(
    (minCommits, list) =>
      map(
        pipe(
          filter( o => o.commitsCount > minCommits ),
          length,
        ),
        list,
    )
  );
const SliderTitle = ({description, displayValue, value, onChange, sliderConfig}) => {
  return (
    <ChartTitle {...{description}}>
      Contributors with more than&nbsp;<BlinkSlider {...{value, displayValue, onChange, sliderConfig}}/> commits
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
    const data = extractData(minCommits, list);
    const sliderConfig = {min: 0, max: 200, step: 1};
    return (
      <ChartCard>
        <SliderTitle {...{description, value: minCommits, displayValue: minCommits, onChange, sliderConfig}}/>
        <BarChart  {...{config, data}}/>
      </ChartCard>
    );
  };
}
export default Contributors;