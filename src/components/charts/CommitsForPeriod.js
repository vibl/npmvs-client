import React, {Component} from 'react';
import {pure} from 'recompose';
import {connect} from 'react-redux';
import {connectStatePure} from '../../logic/utils';
import ChartCard from '../card/ChartCard';
import Divchart from './Divchart/DivchartContainer';
import ChartTitle from '../card/ChartTitle';
import BlinkSlider from '../card/BlinkSlider';
import {mapObjIndexed} from 'ramda';
const {isEmpty} = require('../../logic/vibl-fp');

const description = `
When this number is high, it shows that the project is somehow active (though keep in mind that quantity does not always produce quality).

When the number is close to 0, it might be a bad sign...
`;
const sliderValues = [
  ['week'],
  ['month'],
  ['3 months'],
  ['6 months'],
  ['year'],
];
const displayFn = x => x;

const SliderTitle = ({description, displayValue, value, onChange, sliderConfig}) => {
  const valueSlider = <BlinkSlider
    {...{value, displayValue, onChange, sliderConfig, popupStyle: {width: '5rem'}}}/>;
  return (
    <ChartTitle {...{description}}>
      Number of commits in the last {valueSlider}
    </ChartTitle>
  )
};
class CommitsForPeriod extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 3,
    }
  }
  onChange = (event, value) => {
    this.setState({value});
  };
  render() {
    const {onChange, props:{data: rawData}, state:{value}} = this;
    if( isEmpty(rawData) ) return null;
    const sliderConfig = {min: 0, max: 4, step: 1};
    const data = mapObjIndexed(x => x && x[value], rawData);
    return (
      <ChartCard>
        <SliderTitle {...{description, value, displayValue: sliderValues[value], onChange, sliderConfig}}/>
        <Divchart  {...{displayFn, data}}/>
      </ChartCard>
    );
  };
}
const selectorFn = ({commits}) => commits.map( o => o.count );

export default connectStatePure(CommitsForPeriod, selectorFn);
