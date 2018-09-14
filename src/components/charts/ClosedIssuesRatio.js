import React from 'react';
import BasicCard from "../card/BasicCard";
import fn from '../../logic/field-fns';

const description = `
-> *(Number of closed issues)* <-

-> divided by <-

-> *(Total number of issues)* <-

<small>This is more relevant than just counting open issues   
because it takes into account the size of the project.   
Also, some types of projects just generate more issues   
 than others.</small>
`;
export const config = {
  label: 'Percent of closed issues',
  dataPoint: 'issues',
  extractFn: x => x,
  displayFn: fn.significanPercentDisplay,
  description,
};
export default ({data}) => <BasicCard {...{config, data}} />;

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
    const data = // ({count, openCount}) => (count - openCount) / count * 100,
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