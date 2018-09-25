import React from 'react';
import BasicCard from "../../card/BasicCard";
import l from '../../../logic/localiz';
import {connectStatePure} from "../../../logic/utils";

const description = `
Number of NPM packages that depend on this one.

Bear in mind that any existing package is counted here, 
included unused and dead packages (which are a large majority on NPM).
<>
Le nombre de modules sur NPM qui dépendent de celui-ci.

Gardez en tête que tous les modules sont comptés ici, y compris les modules non utilisés ou obsolètes 
(qui sont une large majorité sur NPM).
`;

const title = 'Dependent packages<>Modules dépendants de celui-ci';

const Dependents = ({data}) => ! data ? null : <BasicCard {...{title: l(title), description: l(description) , data}} />;

const selectorFn = ({dependentsCount}) => dependentsCount;

export default connectStatePure(Dependents, 'Dependents', selectorFn);
