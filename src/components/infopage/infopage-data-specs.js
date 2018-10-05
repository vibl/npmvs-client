import React from 'react';
import {Author, ifDifferentLink, displayCommitsCount, displayDependencies, displayReleasesCount,
  NPMUsersLinks, Link, Markdown, NPMUserLink} from './infopage-elements';

export default {
  'InfoPages:{packName}': [
    {
      id: 'version',
      label: 'Latest version<>Dernière version',
      datapoint: 'version',
    },
    {
      id: 'description',
      label: 'Description',
      datapoint: 'description',
      displayFn: str => Markdown({source: str}),
    },
    {
      id: 'keywords',
      label: 'Keywords<>Mots-clés',
      datapoint: 'keywords',
      displayFn: a => a && a.join(", "),
    },
    {
      id: 'repository',
      label: 'Repository<>Dépôt',
      datapoint: 'repositoryUrl',
      displayFn: value => Link({value}),
    },
    {
      id: 'homepage',
      label: 'Homepage<>Site web',
      datapoint: 'links_homepageUrl',
      extractFn: ifDifferentLink(['links_repository', 'github_homepage', 'links_npm']),
      displayFn: value => Link({value}),
    },
    {
      id: 'homepageGH',
      label: 'Homepage<>Site web',
      datapoint: 'homepage2Url',
      extractFn: ifDifferentLink(['links_repository', 'links_npm']),
      displayFn: value => Link({value}),
    },
    {
      id: 'npm',
      label: 'NPM page<>Page sur NPM',
      datapoint: 'npmUrl',
      displayFn: value => Link({value}),
    },
    {
      id: 'bugs',
      label: 'Bug reports<>Gestion des tickets',
      datapoint: 'bugsUrl',
      displayFn: value => Link({value}),
    },
    {
      id: 'starsCount',
      label: 'GitHub stars',
      datapoint: 'starsCount',
    },
    {
      id: 'subscribersCount',
      label: 'GitHub subscribers',
      datapoint: 'subscribersCount',
    },
    {
      id: 'forksCount',
      label: 'GitHub forks',
      datapoint: 'forksCount',
    },
    {
      id: 'dependentsCount',
      label: 'Dependent packages',
      datapoint: 'dependentsCount',
    },
    {
      id: 'author',
      label: 'Author<>Auteur',
      datapoint: 'author',
      displayFn: author => author && Author(author),
    },
    {
      id: 'publisher',
      label: 'Publisher on NPM<>Contributeur sur NPM',
      datapoint: 'publisher',
      displayFn: ({username}, _, data) =>
        username && (username === data.publisher.username || username === data.author.username)
          ? null
          : NPMUserLink({username}),
    },
    {
      id: 'maintainers',
      label: 'Maintainers<>Développeurs',
      datapoint: 'maintainers',
      displayFn: (users, _, data) =>
        users.length <= 1 && ( users[0].username === data.publisher.username || users[0].username === data.author.username )
          ? null
          : NPMUsersLinks({users})
    },
    {
      id: 'license',
      label: 'License<>Licence',
      datapoint: 'license',
    },
    {
      id: 'commits',
      label: 'Commits<>Commits',
      datapoint: 'commits',
      displayFn: value => displayCommitsCount({value}),
    },
    {
      id: 'dependencies',
      label: 'Dependencies<>Dépendences',
      datapoint: 'dependencies',
      displayFn: value => displayDependencies({value}),
    },
    {
      id: 'readme',
      label: 'Readme',
      datapoint: 'readme',
    },
    {
      id: 'updated_on',
      label: 'Updated on',
      datapoint: 'metadata_date',
      displayFn: s => new Date(s).toLocaleString('en-GB').slice(0,10),
    },
/*
    issues_count: {
      label: 'Total issues',
      datapoint: 'issues_count',
    },
    issues_openCount: {
      label: 'Open issues',
      datapoint: 'issues_openCount',
    },
     {
      id: 'releases',
      label: 'Releases<>Releases',
      datapoint: 'releases',
      displayFn: value => displayReleasesCount({value}),
    },*/

  ],
};