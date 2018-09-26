import React, {Component} from 'react';
import l from '../../util/localiz';
import {connectStatePure} from '../../util/utils';
import ChartCard from '../card/ChartCard';
import Divchart from './Divchart/DivchartContainer';
import ChartTitle from '../card/ChartTitle';
import BlinkSlider from '../card/BlinkSlider';
import {mapObjIndexed} from 'ramda';
const {isBlank} = require('../../util/vibl-fp');

const description = `
A high number shows that the project is somehow active (though keep in mind that quantity 
does not always produce quality).

When the number is close to zero, it might be a bad sign...
<>
Un nombre élevé montre que le projet a une certaine activité (même s'il faut garder en tête que
la quantité ne produit pas nécessairement de la qualité).

Quand ce nombre est proche de zéro, cela pourrait être mauvais signe...
`;
const sliderValues = [
  ['in the last 3 months<>depuis 3 mois'],
  ['in the last 6 months<>depuis 6 mois'],
  ["in the last year<>depuis 1 an"],
  ["in the last 2 years<>depuis 2 ans"],
  ["overall<>total"],

];
const displayFn = x => x;

const SliderTitle = ({description, displayValue, value, onChange, sliderConfig}) => {
  return (
    <ChartTitle {...{description}}>
      {l`Number of releases<>Nombre de releases`} <BlinkSlider
      {...{value, displayValue, onChange, sliderConfig, popupStyle: {width: '5rem'}}}/>
    </ChartTitle>
  )
};
class ReleasesForPeriod extends Component {
  onChange = (event, state) => {
    this.props.setState(state);
  };
  render() {
    const {onChange, props:{data: rawData, state}} = this;
    if( isBlank(rawData) ) return null;
    const sliderConfig = {min: 0, max: 4, step: 1};
    const data = mapObjIndexed(x => x && x[state], rawData);
    return (
      <ChartCard>
        <SliderTitle {...{description, value: state, displayValue: l(sliderValues[state]), onChange, sliderConfig}}/>
        <Divchart  {...{displayFn, data}}/>
      </ChartCard>
    );
  };
}
const selectorFn = ({releases}) => releases;

export default connectStatePure(ReleasesForPeriod, 'ReleasesForPeriod', selectorFn);
