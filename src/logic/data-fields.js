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
    label: 'Downloads in the last 12 months',
    dataPoint: 'downloads',
    component: 'LineChart',
  },
  downloadsAverageGrowth: {
    label: 'Average downloads growth in the last 12 months',
    dataPoint: 'downloads',
    computeFn: 'downloadsAverageGrowth',
    displayFn: 'significanPercentDisplay',
    component: 'SmartBarChart',
  },
  downloadsAcceleration: {
    label: 'Downloads acceleration in the last 12 months',
    description: 'Average weekly downloads acceleration. Acceleration = (growth for week N) / (growth for week N-1)',
    dataPoint: 'downloads',
    computeFn: 'downloadsAcceleration',
    displayFn: 'significanPercentDisplay',
    component: 'SmartBarChart',
  },
  closedIssuesRatio: {
    label: '(number of closed issues) / (number of open issues)',
    dataPoint: 'issues',
    computeFn: 'closedIssuesRatio',
    component: 'SmartBarChart',
  },
  percentIssuesClosedIn3daysOrLess: {
    label: 'Percentage of issues closed in 3 days or less',
    dataPoint: 'issues',
    computeFn: 'percentIssuesClosedIn3daysOrLess',
    displayFn: 'significanPercentDisplay',
    component: 'SmartBarChart',
  },
  contributors: {
    label: 'Number of contributors with more than 2 commits',
    dataPoint: 'contributors',
    computeFn: 'contributorsWithMoreThan2commits',
    component: 'SmartBarChart',
  },
  commits12months: {
    label: 'Number of commits in the last 12 months',
    dataPoint: 'commits',
    computeFn: 'commits12months',
    component: 'SmartBarChart',
  },
};