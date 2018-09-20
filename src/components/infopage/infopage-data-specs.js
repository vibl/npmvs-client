
export default {
  'data.InfoPages.{packId}': {
    name: {
      label: 'Name',
      datapoint: 'name',
    },
    version: {
      label: 'Version',
      datapoint: 'version',
    },
    description: {
      label: 'Description',
      datapoint: 'description',
    },
    keywords: {
      label: 'Keywords',
      datapoint: 'keywords',
      displayFn: 'joinComma',
    },
    author: {
      label: 'Author',
      datapoint: 'author',
      displayFn: 'author',
    },
    publisher: {
      label: 'Publisher',
      datapoint: 'publisher',
      displayFn: 'publisher',
    },
    maintainers: {
      label: 'Maintainers',
      datapoint: 'maintainers',
    },
    repository: {
      label: 'Repository',
      datapoint: 'links_repository',
    },
    npm: {
      label: 'NPM',
      datapoint: 'links_npm',
    },
    homepage: {
      label: 'Homepage',
      datapoint: 'links_homepage',
    },
    homepageGH: {
      label: 'Homepage',
      datapoint: 'github_homepage',
    },
    bugs: {
      label: 'Bugs',
      datapoint: 'links_bugs',
    },
    license: {
      label: 'License',
      datapoint: 'license',
    },
    releases: {
      label: 'Releases',
      datapoint: 'releases',
    },
    readme: {
      label: 'Readme',
      datapoint: 'readme',
      displayFn: 'shorten20chars',
    },
    dependencies: {
      label: 'Dependencies',
      datapoint: 'dependencies',
    },
    forksCount: {
      label: 'Forks',
      datapoint: 'forksCount',
    }
  },
};