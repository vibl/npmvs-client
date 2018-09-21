import React, {Fragment} from 'react';
import {intersperse} from 'ramda';
const {isBlank, toArray} = require('../../logic/vibl-fp');

export const deduplicateLinks = (linksNames) => ({value, data}) => {
  if( isBlank(value) ) return null;
  const bareLink = s => s.replace(/^https?:\/\/(.+)\/?$/, '$1');
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
    componentInstance = React.createElement(Component, null, match);
  } else {
    componentInstance = <Component>{match}</Component>;
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

export const GithubUserLink =
  ({username}) =>
    isBlank(username) ? null : <a href={`https://github.com/${username}`} target="_blank">{username}</a>;

export const NpmPackageLink =
  ({name}) =>
    isBlank(name) ? null : <a href={`https://www.npmjs.com/package/${name}`} target="_blank">{name}</a>;

export const GithubUsersLinks =
  ({users}) =>
    <Fragment>
      { users
        && users.map(
         ({username}) => isBlank(username) ? null : <Fragment key={username}> <GithubUserLink {...{username}}/>, </Fragment>
        )
      }
    </Fragment>;

const releasesTimeSpan = [
  'last month',
  'last 3 months',
  'last 6 months',
  'last year',
  'last 2 years',
];
export const displayReleasesCount =
  ({value}) =>
    <table>
      <tbody>
      { value
      && value.map( ({count}, i) => (
          <tr key={i}>
            <td className="label">{releasesTimeSpan[i]}</td>
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
      { ! value ? 0 :
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