export default {
  // medianIssueDuration: https://github.com/IndigoUnited/node-gh-issues-stats/blob/master/index.js
  // issuesOpenMoreThanTenDays: issues.distribution
  // dependenciesWithLessThan100000downloadsLastYear: dependencies,
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
    computeFn: 'releases',
  },
  readme: {
    label: 'Readme',
    dataPoint: 'readme',
    displayFn: 'shorten20chars',
  },
  downloads: {
    label: 'Downloads past year',
    dataPoint: 'downloads',
    component: 'LineChart',
  },
  forksCount: {
    label: 'Forks count',
    dataPoint: 'forksCount',
    displayFn: 'thousands',
    component: 'SmartBarChart',
  },
  subscribersCount: {
    label: 'Subscribers count',
    dataPoint: 'subscribersCount',
    displayFn: 'thousands',
    component: 'SmartBarChart',
  },
  percentIssuesClosedIn3daysOrLess: {
    label: 'Percentage of issues closed in 3 days or less',
    dataPoint: 'issues.distribution',
    computeFn: 'percentIssuesClosedIn3daysOrLess',
    component: 'SmartBarChart',
  },
  contributors: {
    label: 'Number of contributors',
    dataPoint: 'contributors',
    computeFn: 'paretoContributors',
    component: 'SmartBarChart',
  },
  commits6months: {
    label: 'Number of commits during the last 6 months',
    dataPoint: 'commits',
    computeFn: 'commits6months',
    component: 'SmartBarChart',
  },
};