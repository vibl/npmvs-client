import React from 'react';
import l from '../../util/localiz';
import BasicCard from "../card/BasicCard";
import fn from '../../data/field-fns';
import {connectStatePure} from "../../util/utils";

const description = `
   TODO: description here.
   In days.
   <>
   En jours.
`;
const title = 'Median time of issues resolution<>Durée médiane de résolution des tickets';

const displayFn = n => n + l`d<>j`;

const MedianResolutionTime = ({data}) => ! data ? null :
  <BasicCard {...{title: l(title), description: l(description), data, displayFn}} />;

const selectorFn = ({medianResolutionTime}) => medianResolutionTime;

export default connectStatePure(MedianResolutionTime, selectorFn);
