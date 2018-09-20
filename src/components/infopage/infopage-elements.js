import React, {Fragment} from 'react'

export const Link =
  ({value}) =>
    <a href={value} target="_blank">{value}</a>;

export const GithubUserLink =
  ({username}) =>
    <a href={`https://github.com/${username}`} target="_blank">{username}</a>;

export const GithubUsersLinks =
  ({users}) =>
    <Fragment>
      { users
        && users.map(
         ({username}) => <Fragment> <GithubUserLink key={username} {...{username}}/>, </Fragment>
        )
      }
    </Fragment>;
