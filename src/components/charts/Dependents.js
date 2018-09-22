import React from 'react';
import BasicCard from "../card/BasicCard";
import l from '../../logic/localiz';
import {connectStatePure} from "../../logic/utils";

const description = `
Modules that depend on this one.

Bear in mind that any existing module is counted here, included unused and dead modules.
`;

const title = 'Dependent modules<>Modules dépendants de celui-ci';


const Dependents = ({data}) => ! data ? null : <BasicCard {...{title: l(title), description: l(description) , data}} />;

const selectorFn = ({dependentsCount}) => dependentsCount;

export default connectStatePure(Dependents, selectorFn);
