export default {
  name: {
    label: 'Name',
    dataPoint: 'name',
  },
  version: {
    label: 'Version',
    dataPoint: 'version',
  },
  description: {
    label: 'Description',
    dataPoint: 'description',
  },
  keywords: {
    label: 'Keywords',
    dataPoint: 'keywords',
    displayFn: 'joinComma',
  },
  author: {
    label: 'Author',
    dataPoint: 'author',
    displayFn: 'author',
  },
  publisher: {
    label: 'Publisher',
    dataPoint: 'publisher',
    displayFn: 'publisher',
  },
  maintainers: {
    label: 'Maintainers',
    dataPoint: 'maintainers',
  },
  repository: {
    label: 'Repository',
    dataPoint: 'links.repository',
  },
  npm: {
    label: 'NPM',
    dataPoint: 'links.npm',
  },
  homepage: {
    label: 'Homepage',
    dataPoint: 'links.homepage',
  },
  homepageGH: {
    label: 'Homepage',
    dataPoint: 'github.homepage',
  },
  bugs: {
    label: 'Bugs',
    dataPoint: 'links.bugs',
  },
  license: {
    label: 'License',
    dataPoint: 'license',
  },
  releases: {
    label: 'Releases',
    dataPoint: 'releases',
    extractFn: 'releases',
  },
  readme: {
    label: 'Readme',
    dataPoint: 'readme',
    displayFn: 'shorten20chars',
  },
};