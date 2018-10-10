import React, {Component} from 'react';
import l from '../../util/localiz';
import {connectStatePure} from '../../util/utils';
import ChartCard from '../card/StyledChartCard';
import Divchart from './Divchart/DivchartContainer';
import SliderTitle from '../card/SliderTitle';
import {mapObjIndexed} from 'ramda';
const {isBlank} = require('../../util/vibl-fp');

const infotip = `
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
        <SliderTitle {...{
          textBeforeBlinker: l`Number of releases<>Nombre de releases`,
          infotip: l(infotip),
          value: state,
          displayValue:l(sliderValues[state]),
          sliderConfig,
          sliderWidth: '6rem',
          onChange}}/>
        <Divchart  {...{displayFn, data}}/>
      </ChartCard>
    );
  };
}
const selectorFn = ({releases}) => releases;

export default connectStatePure(ReleasesForPeriod, selectorFn);
