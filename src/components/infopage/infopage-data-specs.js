import React from 'react';
import {GithubUserLink, GithubUsersLinks, Link} from './infopage-elements';

export default {
  'data.InfoPages.{packId}': {
    version: {
      label: 'Latest version',
      datapoint: 'version',
    },
    description: {
      label: 'Description',
      datapoint: 'description',
    },
    keywords: {
      label: 'Keywords',
      datapoint: 'keywords',
      displayFn: a => a && a.join(", "),
    },
    repository: {
      label: 'Repository',
      datapoint: 'links_repository',
      displayFn: value => Link({value}),
    },
    npm: {
      label: 'NPM',
      datapoint: 'links_npm',
      displayFn: value => Link({value}),
    },
    homepage: {
      label: 'Homepage',
      datapoint: 'links_homepage',
      displayFn: value => Link({value}),
    },
    homepageGH: {
      label: 'Homepage',
      datapoint: 'github_homepage',
      displayFn: value => Link({value}),
    },
    bugs: {
      label: 'Bugs',
      datapoint: 'links_bugs',
      displayFn: value => Link({value}),
    },
    license: {
      label: 'License',
      datapoint: 'license',
    },
    author: {
      label: 'Author',
      datapoint: 'author',
      displayFn: o => o && o.name,
    },
    publisher: {
      label: 'Publisher',
      datapoint: 'publisher',
      displayFn: ({username}) => username && GithubUserLink({username}),
    },
    maintainers: {
      label: 'Maintainers',
      datapoint: 'maintainers',
      displayFn: users => GithubUsersLinks({users}),
    },
    releases: {
      label: 'Releases',
      datapoint: 'releases',
      displayFn: a => a && a[3] && a[3].count,
    },
    readme: {
      label: 'Readme',
      datapoint: 'readme',
    },
    // dependencies: {
    //   label: 'Dependencies',
    //   datapoint: 'dependencies',
    // },
    forksCount: {
      label: 'Forks',
      datapoint: 'forksCount',
    }
  },
};