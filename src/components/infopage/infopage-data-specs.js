import React from 'react';
import {deduplicateLinks, displayDependencies, displayReleasesCount,
  GithubUserLink, GithubUsersLinks, Link} from './infopage-elements';

export default {
  'data:InfoPages:{packId}': {
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
    homepage: {
      label: 'Homepage',
      datapoint: 'links_homepage',
      extractFn: deduplicateLinks(['links_repository', 'github_homepage', 'links_npm']),
      displayFn: value => Link({value}),
    },
    homepageGH: {
      label: 'Homepage',
      datapoint: 'github_homepage',
      extractFn: deduplicateLinks(['links_repository', 'links_npm']),
      displayFn: value => Link({value}),
    },
    npm: {
      label: 'NPM page',
      datapoint: 'links_npm',
      displayFn: value => Link({value}),
    },
    bugs: {
      label: 'Bugs',
      datapoint: 'links_bugs',
      displayFn: value => Link({value}),
    },
    // releases: {
    //   label: 'Releases',
    //   datapoint: 'releases',
    //   displayFn: value => displayReleasesCount({value}),
    // },
    // dependentsCount: {
    //   label: 'Modules that depend on this one',
    //   datapoint: 'dependentsCount',
    // },
    starsCount: {
      label: 'Stars (GH)',
      datapoint: 'starsCount',
    },
    subscribersCount: {
      label: 'Subscribers (GH)',
      datapoint: 'subscribersCount',
    },
    forksCount: {
      label: 'Forks (GH)',
      datapoint: 'forksCount',
    },
    // issues_count: {
    //   label: 'Total issues',
    //   datapoint: 'issues_count',
    // },
    // issues_openCount: {
    //   label: 'Open issues',
    //   datapoint: 'issues_openCount',
    // },
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
    license: {
      label: 'License',
      datapoint: 'license',
    },
    dependencies: {
      label: 'Dependencies',
      datapoint: 'dependencies',
      displayFn: value => displayDependencies({value}),
    },
    readme: {
      label: 'Readme',
      datapoint: 'readme',
    },
    updated_on: {
      label: 'Updated on',
      datapoint: 'metadata_date',
      displayFn: s => new Date(s).toLocaleString('en-GB').slice(0,10),
    },

  },
};