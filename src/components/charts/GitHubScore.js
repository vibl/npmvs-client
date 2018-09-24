import React from 'react';
import l from '../../logic/localiz';
import BasicCard from "../card/BasicCard";
import {connectStatePure} from "../../logic/utils";

const description = `
-> = (*stars* / 100) <-
-> \\+ (*subscribers* / 10) <-
-> \\+ (*forks* / 10) <-
*Stars* count has a lower weight because it is much influenced by other factors 
than quality (type of project, hype, wow factor...) Besides, this number is usually an order of
magnitude higher that the other two.

*Suscribing* to a project is more consequential than starring it.

*Forking* it is even more involved: each fork means that a developer considers that the code 
has enough value to work on it or use it as a base 
(although it could also indicates that the project lacks important features or is not maintained).
<>
-> = (*stars* / 100) <-
-> \\+ (*subscribers* / 10) <-
-> \\+ (*forks* / 10) <-
Le nombre de *stars* a un poids moins élevé car il est très influencé par d'autres facteurs que la
qualité (type de projet, buzz, effet "Whaou !"). Par ailleurs ce chiffre est généralement dix fois plus
grand que les deux autres.

Les *subscribers* sont une mesure plus pertinente.

les *forks* sont encore plus concrets: chaque *fork* signifie qu'un développeur considère que 
le code a assez de valeur pour travailler dessus ou l'utiliser comme base (même si cela peut aussi
indiquer que le projet manque de fonctionnalités importantes ou n'est pas maintenu). 
`;

const title = 'GitHub score<>Score sur GitHub';

const GitHubScore = ({data}) => ! data ? null :
  <BasicCard {...{title: l(title), description: l(description), data}} />

const selectorFn = ({starsCount, subscribersCount, forksCount }) =>
  Math.round(starsCount / 100 + subscribersCount / 10 + forksCount / 10);

export default connectStatePure(GitHubScore, 'GitHubScore', selectorFn);
