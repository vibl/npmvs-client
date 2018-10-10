import React from 'react';
import l from '../../util/localiz';
import BasicCard from "../card/BasicCard";
import {connectStatePure} from "../../util/utils";

const infotip = `
-> = *forks* + *subscribers* + (*stars* / 5)  <-
*Stars* count has a lower weight because it is much influenced by other factors 
than quality (type of project, hype, apparences, wow factor, first impressions...) Besides, this number is on average 5 times higher than
the number of *forks*.

*Suscribers* show a higher interest to the project.

*Forking* is even more involved: each fork means that a developer considers that the code 
has enough value to work on it or use it as a base 
(although it could also indicates that the project lacks important features or is not maintained).

The *stars*, *subscribers* and *forks* counts appear on the package information page (hover on tabs on the app bar). 
<>
-> = *forks* + *subscribers* + (*stars* / 5) <-
Le poids du nombre de *stars* est réduit car il est très influencé par d'autres facteurs que la
qualité (type de projet, buzz, apparence, premières impressions...). Par ailleurs ce chiffre est en moyenne 5 fois plus
grand que le nombre de forks.

Les *subscribers* montrent davantage leur intérêt  pour le projet. 

Le nombre de *forks* est encore plus significatif: chaque *fork* signifie qu'un développeur considère que 
le code a assez de valeur pour travailler dessus ou l'utiliser comme base (même si cela peut aussi
indiquer que le projet manque de fonctionnalités importantes ou n'est pas maintenu). 

Le décompte des *stars*, *subscribers* et *forks* apparaît dans la page d'information du module (survoler les onglets dans la barre d'application ci-dessus).
`;

const title = 'GitHub score<>Score sur GitHub';

const GitHubScore = ({data}) => ! data ? null :
  <BasicCard {...{title: l(title), infotip: l(infotip), data}} />;

const selectorFn = ({starsCount, forksCount, subscribersCount }) =>
  Math.round(starsCount / 5 + forksCount + subscribersCount);

export default connectStatePure(GitHubScore, selectorFn);
