import React from 'react';
import BasicCard from "../card/BasicCard";
import l from '../../logic/localiz';
import {connectStatePure} from "../../logic/utils";

const description = `
Number of GitHub repositories that include this package on their \`packages.json\`.

Note that this includes many disposable, dead or otherwise unused repositories (and not just NPM packages).
<>
Le nombre de dépôts sur GitHub qui contiennent ce module dans leur \`packages.json\`.

Notez que cela inclut de nombreux dépôts "jetables", obsolètes ou non utilisés (et pas seulement des modules NPM).
`;

const title = 'Dependent repositories on GitHub<>Projets sur GitHub dépendants de celui-ci';

const DependentReposCount = ({data}) => ! data ? null : <BasicCard {...{title: l(title), description: l(description) , data}} />;

const selectorFn = ({dependentReposCount}) => dependentReposCount;

export default connectStatePure(DependentReposCount, 'DependentReposCount', selectorFn);
