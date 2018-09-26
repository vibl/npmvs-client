import React from 'react';
import l from '../../util/localiz';
import BasicCard from "../card/BasicCard";
import fn from '../../data/field-fns';
import {connectStatePure} from "../../util/utils";

const description = `
-> *(Number of closed issues)* <-

-> divided by <-

-> *(Total number of issues)* <-

<small>This ratio is more relevant than just counting open issues 
because some types of projects (big ones for example) generate more 
issues than others, regardless of their quality.</small>
 <>
-> *(Nombre de tickets fermés)* <-

-> divisé par <-

-> *(Nombre total de tickets)* <-
-> <small>Cet indicateur est plus pertinent que le nombre de tickets ouverts 
parce que certains types de projets (ceux de grande taille par exemple) 
génèrent plus de tickets que d'autres, indépendamment de leur qualité.</small> <-
`;
const title = 'Percent of closed issues<>Pourcentage de tickets fermés';
const displayFn = fn.significanPercentDisplay;

const ClosedIssuesRatio = ({data}) => ! data ? null :
  <BasicCard {...{title: l(title), description: l(description), displayFn, data}} />

const selectorFn = ({closedPercent}) => closedPercent;

export default connectStatePure(ClosedIssuesRatio, selectorFn);
