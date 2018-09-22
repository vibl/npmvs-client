import React from 'react';
import {Author, ifDifferentLink, displayDependencies,
  NPMUsersLinks, Link, Markdown, NPMUserLink} from './infopage-elements';

export default {
  'data:InfoPages:{packId}': {
    version: {
      label: 'Latest version<>Dernière version',
      datapoint: 'version',
    },
    description: {
      label: 'Description',
      datapoint: 'description',
      displayFn: str => Markdown({source: str}),
    },
    keywords: {
      label: 'Keywords<>Mots-clés',
      datapoint: 'keywords',
      displayFn: a => a && a.join(", "),
    },
    repository: {
      label: 'Repository<>Dépôt',
      datapoint: 'links_repository',
      displayFn: value => Link({value}),
    },
    homepage: {
      label: 'Homepage<>Site web',
      datapoint: 'links_homepage',
      extractFn: ifDifferentLink(['links_repository', 'github_homepage', 'links_npm']),
      displayFn: value => Link({value}),
    },
    homepageGH: {
      label: 'Homepage<>Site web',
      datapoint: 'github_homepage',
      extractFn: ifDifferentLink(['links_repository', 'links_npm']),
      displayFn: value => Link({value}),
    },
    npm: {
      label: 'NPM page<>Page sur NPM',
      datapoint: 'links_npm',
      displayFn: value => Link({value}),
    },
    bugs: {
      label: 'Bug reports<>Gestion des tickets',
      datapoint: 'links_bugs',
      displayFn: value => Link({value}),
    },
    starsCount: {
      label: 'GitHub stars',
      datapoint: 'starsCount',
    },
    subscribersCount: {
      label: 'GitHub subscribers',
      datapoint: 'subscribersCount',
    },
    forksCount: {
      label: 'GitHub forks',
      datapoint: 'forksCount',
    },
    author: {
      label: 'Author<>Auteur',
      datapoint: 'author',
      displayFn: author => author && Author(author),
    },
    publisher: {
      label: 'Publisher on NPM<>Contributeur sur NPM',
      datapoint: 'publisher',
      displayFn: ({username}, _, data) =>
        username && (username === data.publisher.username || username === data.author.username)
          ? null
          : NPMUserLink({username}),
    },
    maintainers: {
      label: 'Maintainers<>Développeurs',
      datapoint: 'maintainers',
      displayFn: (users, _, data) =>  {
        users.length <= 1 && ( users[0].username === data.publisher.username || users[0].username === data.author.username )
          ? null
          : NPMUsersLinks({users})
      }
    },
    license: {
      label: 'License<>Licence',
      datapoint: 'license',
    },
    dependencies: {
      label: 'Dependencies<>Dépendences',
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
    // releases: {
    //   label: 'Releases',
    //   datapoint: 'releases',
    //   displayFn: value => displayReleasesCount({value}),
    // },
    // dependentsCount: {
    //   label: 'Modules that depend on this one',
    //   datapoint: 'dependentsCount',
    // },
    // issues_count: {
    //   label: 'Total issues',
    //   datapoint: 'issues_count',
    // },
    // issues_openCount: {
    //   label: 'Open issues',
    //   datapoint: 'issues_openCount',
    // },
  },
};