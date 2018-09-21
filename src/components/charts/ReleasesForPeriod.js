import React, {Component} from 'react';
import {connectStatePure} from '../../logic/utils';
import ChartCard from '../card/ChartCard';
import Divchart from './Divchart/DivchartContainer';
import ChartTitle from '../card/ChartTitle';
import BlinkSlider from '../card/BlinkSlider';
import {mapObjIndexed} from 'ramda';
const {isBlank} = require('../../logic/vibl-fp');

const description = `
When this number is high, it shows that the project is somehow active (though keep in mind that quantity does not always produce quality).

When the number is close to 0, it might be a bad sign...
`;
const sliderValues = [
  ['month'],
  ['3 months'],
  ['6 months'],
  ['year'],
  ['2 years']
];
const displayFn = x => x;

const SliderTitle = ({description, displayValue, value, onChange, sliderConfig}) => {
  const valueSlider = <BlinkSlider
    {...{value, displayValue, onChange, sliderConfig, popupStyle: {width: '5rem'}}}/>;
  return (
    <ChartTitle {...{description}}>
      Number of releases in the last {valueSlider}
    </ChartTitle>
  )
};
class ReleasesForPeriod extends Component {
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
    if( isBlank(rawData) ) return null;
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
const selectorFn = ({releases}) => releases.map(o => o.count );

export default connectStatePure(ReleasesForPeriod, selectorFn);
