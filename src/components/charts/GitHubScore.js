import React from 'react';
import l from '../../logic/localiz';
import BasicCard from "../card/BasicCard";
import {connectStatePure} from "../../logic/utils";

const description = `
-> = (*stars* / 5) + (*forks*) <-
*Stars* count has a lower weight because it is much influenced by other factors 
than quality (type of project, hype, apparences and wow factor...) Besides, this number is on average 5 times higher than
the number of *forks*.

*Suscribing* to a project is more consequential than starring it.

*Forking* is even more involved: each fork means that a developer considers that the code 
has enough value to work on it or use it as a base 
(although it could also indicates that the project lacks important features or is not maintained).

The *stars*, *subscribers* and *forks* counts appear on the package information page (hover on tabs on the app bar). 
<>
-> = (*stars* / 5) + (*forks*) <-
Le nombre de *stars* a un poids moins élevé car il est très influencé par d'autres facteurs que la
qualité (type de projet, buzz, apparence et premières impressions...). Par ailleurs ce chiffre est en moyenne 5 fois plus
grand que le nombre de forks.

Les *forks* sont plus concrets: chaque *fork* signifie qu'un développeur considère que 
le code a assez de valeur pour travailler dessus ou l'utiliser comme base (même si cela peut aussi
indiquer que le projet manque de fonctionnalités importantes ou n'est pas maintenu). 

Le décompte des *stars* et *forks* apparaît dans la page d'information du module (survoler les onglets dans la barre d'application ci-dessus).
`;

const title = 'GitHub score<>Score sur GitHub';

const GitHubScore = ({data}) => ! data ? null :
  <BasicCard {...{title: l(title), description: l(description), data}} />

const selectorFn = ({starsCount, forksCount }) =>
  Math.round(starsCount / 5 + forksCount / 10);

export default connectStatePure(GitHubScore, 'GitHubScore', selectorFn);
