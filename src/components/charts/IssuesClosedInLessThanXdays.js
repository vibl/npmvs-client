import React, {Component} from 'react';
import l from '../../util/localiz';
import {connectStatePure, mem} from '../../util/utils';
import fn from '../../util/vibl-number';
import ChartCard from '../card/StyledChartCard';
import DivBarChart from './Divchart/DivchartContainer';
import SliderTitle from '../card/SliderTitle';
import {map, pipe, prop} from 'ramda';
const {mapKeys} = require('../../util/vibl-fp');

const infotip = `
-> *(number of issues that stayed open for duration X)* <-

-> divided by <-

-> *(total number of issues)* <-
<small>In open source project, issues are usually closed when they are resolved. One exception to that
would be issues that are used for deliberation for long-running decisions. However, those are usually
rare and wouldn't affect this ratio much.</small>
<>
-> *(nombre de tickets restés ouvert pendant la durée X)* <-

-> divisé par <-

-> *(nombre total de tickets)* <-
<small>Dans les projets open source, les tickets sont généralement fermés quand ils sont résolus.
Il y a des exceptions, comme les tickets utilisés pour la délibération dans les décisions
prenant du temps. Mais elles sont généralement rares et n'affectent pas beaucoup ce ratio. </small>

`;
const labels = {
  1: "1 hour<>1 heure",
  3: "3 hours<>3 heures",
  9: "9 hours<>9 heures",
  27: "1 day<>1 jour",
  81: "3 days<>3 jours",
  243: "10 days<>10 jours",
  729: "30 days<>30 jours",
  2187: "3 months<>3 mois",
  6561: "9 months<>9 mois",
  19683: "2 years<>2 ans",
  59049: "7 years<>7 ans",
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
class IssuesClosedInLessThanXdays extends Component {
  onChange = (event, state) => {
    this.props.setState(state);
  };
  render() {
    const {onChange, props:{data: distribution, state}} = this;
    // const data = map( reg => reg.predict(exponent), packRegressions);
    if( !distribution ) return null;
    const data = map(d => extractData(state, d), distribution);
    const sliderConfig = {min: 0, max: 9, step: 1};
    return (
      <ChartCard>
        <SliderTitle {...{
          textBeforeBlinker: l`Issues resolved in less than<>Tickets résolus en moins de`,
          infotip: l(infotip),
          value: state,
          displayValue:l(labels[3**state]),
          sliderConfig,
          sliderWidth: '8rem',
          onChange}}/>
        <DivBarChart {...{displayFn, data}}/>
      </ChartCard>
    );
  };
}
const selectorFn = ({issues_distribution}) => mapKeys( key => key/3600, issues_distribution);

export default connectStatePure(IssuesClosedInLessThanXdays, selectorFn);