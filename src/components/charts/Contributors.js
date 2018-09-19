import React, {Component} from 'react';
import {connect} from "react-redux";
import {mem} from '../../logic/utils';
import {pure} from 'recompose';
import ChartCard from '../card/ChartCard';
import Divchart from './Divchart/DivchartContainer';
import ChartTitle from '../card/ChartTitle';
import BlinkSlider from '../card/BlinkSlider';
import {filter, length, map, pipe} from 'ramda';
import {getData} from "../../logic/utils";

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
    (minCommits, packagesData) =>
      map( x => {
        if( !x ) return null;
        x = x.filter( o => o.commitsCount > minCommits );
        x = x.length;
        return x;
      }, packagesData)
  );
const SliderTitle = ({description, displayValue, value, onChange, sliderConfig}) => {
  const valueSlider = <BlinkSlider
    {...{value, displayValue, onChange, sliderConfig, popupStyle: {width: '5rem'}}}/>
  return (
    <ChartTitle {...{description}}>
      Contributors with more than {valueSlider} commits
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
    const {onChange, props:{data: list}, state:{exponent}} = this;
    const minCommits = 2**exponent;
    if( !list ) return null;
    const data = extractData(minCommits, list);
    const sliderConfig = {min: 0, max: 10, step: 1};
    return (
      <ChartCard>
        <SliderTitle {...{description, value: exponent, displayValue: minCommits, onChange, sliderConfig}}/>
        <Divchart  {...{config, data}}/>
      </ChartCard>
    );
  };
}
const mapStateToProps = (state) => ({
  data: state.data.contributors,
});
export default connect(mapStateToProps)(pure(Contributors));