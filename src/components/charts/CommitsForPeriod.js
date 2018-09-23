import React, {Component} from 'react';
import l from '../../logic/localiz';
import {connectStatePure} from '../../logic/utils';
import ChartCard from '../card/ChartCard';
import Divchart from './Divchart/DivchartContainer';
import ChartTitle from '../card/ChartTitle';
import BlinkSlider from '../card/BlinkSlider';
import {mapObjIndexed} from 'ramda';
const {isBlank} = require('../../logic/vibl-fp');

const description = `
When this number is high, it shows that the project is somehow active (though keep in mind that quantity does not always produce quality).

When the number is close to zero, it might be a bad sign...
`;
const sliderValues = [
  ['the last week<>la dernière semaine'],
  ['the last month<>le dernier mois'],
  ['the last 3 months<>les 3 derniers mois'],
  ['the last 6 months<>les 6 derniers mois'],
  ["the last year<>l'année passée"],
];
const displayFn = x => x;

const SliderTitle = ({description, displayValue, value, onChange, sliderConfig}) => {
  return (
    <ChartTitle {...{description}}>
      {l('Number of commits in the last<>Nombre de commits dans ')} <BlinkSlider
      {...{value, displayValue, onChange, sliderConfig, popupStyle: {width: '5rem'}}}/>
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
    console.log(rawData);
    if( isBlank(rawData) ) return null;
    const sliderConfig = {min: 0, max: 4, step: 1};
    const data = mapObjIndexed(x => x && x[value], rawData);
    return (
      <ChartCard>
        <SliderTitle {...{description, value, displayValue: l(sliderValues[value]), onChange, sliderConfig}}/>
        <Divchart  {...{displayFn, data}}/>
      </ChartCard>
    );
  };
}
const selectorFn = ({commits}) => commits.map( o => o.count );

export default connectStatePure(CommitsForPeriod, 'CommitsForPeriod', selectorFn);
