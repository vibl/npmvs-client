import React, {Component} from 'react';
import mem from 'mem';
import {connect} from "react-redux";
import {getData} from "../../logic/utils";
import fn from '../../logic/field-fns';
import ChartCard from '../card/ChartCard';
import DivBarChart from './Divchart/DivchartContainer';
import ChartTitle from '../card/ChartTitle';
import BlinkSlider from '../card/BlinkSlider';
import {map, pipe, prop} from 'ramda';
const {mapKeys} = require('../../logic/vibl-fp');

const description = `
-> *(Number of issues that where closed less than three days after they were open)* <-

-> divided by <-

-> *(Total number of issues)* <-
<small>In open source project, issues are usually closed when they are resolved. One exception to that rule
would be issues that are used for deliberation for long-running decisions. However, those are usually
rare and wouldn't affect this ratio much.</small>
`;
const labels = {
  1: "1 hour",
  3: "3 hours",
  9: "9 hours",
  27: "1 day",
  81: "3 days",
  243: "10 days",
  729: "30 days",
  2187: "3 months",
  6561: "9 months",
  19683: "2 years",
  59049: "7 years",
};
// const extractFn =  (issues) => {
//   let data = toPairs(issues.distribution);
//   data = pipe(
//     values,
//     scan(add, 0),
//     tail,
//     zip(keys(data)),
//   )(data);
//   let i, window, reg, acc = {}, last = data.length - 1;
//   for(i=1; i<last; i++) {
//     window = [data[i-1], data[i], data[i+1]];
//     acc[data[i][0]] = regression.polynomial(window, { order: 5 });
//   }
//   debugger;
//   return acc;
// };

const displayFn = fn.significanPercentDisplay;

const extractData = mem( (exponent, dist) => {
  const maxHours = 3**exponent;
  let relevantCount = 0, totalCount = 0, hours;
  for(hours in dist) {
    const issues = parseInt(dist[hours]);
    totalCount += issues;
    if( hours <= maxHours ) {
      relevantCount += issues;
    }
  }
  return Math.round(relevantCount / totalCount * 100);
});
const SliderTitle = ({description, value, displayValue, sliderConfig, onChange}) => {
  const valueSlider = <BlinkSlider
    {...{value, displayValue, onChange, sliderConfig, popupStyle: {width: '4rem'}}}/>
  return (
    <ChartTitle {...{description}}>
      Issues closed in less than {valueSlider}
    </ChartTitle>
  );
};
class IssuesClosedInLessThanXdays extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exponent: 1,
    }
  }
  onChange = (event, exponent) => {
    this.setState({exponent});
  };
  render() {
    const {onChange, props:{data: distribution}, state:{exponent}} = this;
    // const data = map( reg => reg.predict(exponent), packRegressions);
    if( !distribution ) return null;
    const data = map(d => extractData(exponent, d), distribution);
    const sliderConfig = {min: 0, max: 9, step: 1};
    return (
      <ChartCard>
        <SliderTitle {...{description, value: exponent, displayValue:labels[3**exponent], sliderConfig, onChange}}/>
        <DivBarChart {...{displayFn, data}}/>
      </ChartCard>
    );
  };
}

const extractFn = mapKeys( key => key/3600 );

const mapStateToProps = (state) => ({
  data: getData(state, 'issues.distribution', extractFn),
});
export default connect(mapStateToProps)(IssuesClosedInLessThanXdays);