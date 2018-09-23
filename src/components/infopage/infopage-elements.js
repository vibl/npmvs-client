import React, {Fragment} from 'react';
import ReactMarkdown from 'react-markdown';
import {intersperse} from 'ramda';
import l from '../../logic/localiz';
const {isBlank, toArray} = require('../../logic/vibl-fp');

export const ifDifferentLink = (linksNames) => ({value, data}) => {
  if( isBlank(value) ) return null;
  const bareLink = s => s.match(/^https?:\/\/([^#]+)/)[1].replace(/\/$/,'');
  for(const linkName of linksNames) {
    const link = data[linkName];
    if( isBlank(link) ) continue;
    if( bareLink(link) === bareLink(value) ) {
      return null;
    }
  }
  return value;
};
const wrapPatternInComponent = (Component, pattern, group, str) => {
  let componentInstance;
  const res = str.match(pattern);
  if( ! res ) return str;
  const match = res[group]; // Use only one group (one set of parentheses)
  const splitted = str.split(match);

  if( typeof Component === 'string') {
    componentInstance = React.createElement(Component, {key: match}, match);
  } else {
    componentInstance = <Component key={match}>{match}</Component>;
  }
  const interspersed = intersperse(componentInstance, splitted);
  return (
    <Fragment>
      {interspersed}
    </Fragment>
  )
};
export const Link = ({value: url}) => {
  if( isBlank(url) ) return null;
  const content = wrapPatternInComponent('strong', /^https?:\/\/(www\.)?([^/]+)/, 2, url);
  return <a href={url} target="_blank">{content}</a>;
};

export const GithubUserLink = ({username}) =>
    isBlank(username) ? null : <a href={`https://github.com/${username}`} target="_blank">{username}</a>;

export const NpmPackageLink = ({name}) =>
    isBlank(name) ? null : <a href={`https://www.npmjs.com/package/${name}`} target="_blank">{name}</a>;

export const NPMUserLink = ({username}) =>
    isBlank(username) ? null : <a href={`https://www.npmjs.com/~${username}`} target="_blank">{username}</a>;

export const NPMUsersLinks = ({users}) => {
  if( ! users ) return null;
  const usersLinks = users.map(
    ({username}) => isBlank(username) ? null : <NPMUserLink key={username} {...{username}}/>);
  return (
    <Fragment>
      { intersperse(',', usersLinks) }
    </Fragment>
  );
};
export const Author = ({name, username}) => {
  return isBlank(username) ? null : (
    <Fragment>
      {name} (<a href={`https://www.npmjs.com/~${username}`} target="_blank">{username}</a>)
    </Fragment>
  );
};
const releasesTimeSpan = [
  'last month<>le mois dernier',
  'last 3 months<>les 3 derniers mois',
  'last 6 months<>les 6 derniers mois',
  'last year<>l\'année passée',
  'last 2 years<>les 2 dernières années',
];
export const displayReleasesCount =
  ({value}) =>
    <table>
      <tbody>
      { ! value ? null :
         value.map( ({count}, i) => (
          <tr key={i}>
            <td className="label">{l(releasesTimeSpan[i])}</td>
            <td className="value">{count}</td>
          </tr>
        ))
      }
      </tbody>
    </table>;

export const displayDependencies =
  ({value}) =>
    <table>
      <tbody>
      { ! value ? null :
        toArray(value,
        (version, name) => (
          <tr key={name}>
            <td className="label"><NpmPackageLink {...{name}}/></td>
            <td className="value">{version}</td>
          </tr>
        ))
      }
      </tbody>
    </table>;

export const Markdown = (props) => (
  <ReactMarkdown
    {...props}
    escapeHtml={false}
  />
);
export const tmp1 = null;
