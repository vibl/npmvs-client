module.exports = {
  label: {
     label: 'Name',
     source: 'npms',
     path: 'collected.metadata.name',
     rawFn: 'ident',
     displayFn: 'ident',
     component: 'Simple',
  },
  scope: {
     label: 'Scope',
     source: 'npms',
     path: 'collected.metadata.scope',
     rawFn: 'ident',
     displayFn: 'ident',
     component: 'Simple',
  },
  downloadsChart: {
    label: 'Downloads last year',
    source: 'npm_downloads',
    path: '',
    rawFn: 'ident',
    displayFn: 'ident',
    component: 'LineChart',
  },
  version: {
     label: 'Version',
     source: 'npms',
     path: 'collected.metadata.version',
     rawFn: 'ident',
     displayFn: 'ident',
     component: 'Simple',
  },
  description: {
     label: 'Description',
     source: 'npms',
     path: 'collected.metadata.description',
     rawFn: 'ident',
     displayFn: 'ident',
     component: 'Simple',
  },
  keywords: {
     label: 'Keywords',
     source: 'npms',
     path: 'collected.metadata.keywords',
     rawFn: 'ident',
     displayFn: 'joinComma',
     component: 'Simple',
  },
  author: {
     label: 'Author',
     source: 'npms',
     path: 'collected.metadata.author',
     rawFn: 'ident',
     displayFn: 'author',
     component: 'Simple',
  },
  publisher: {
     label: 'Publisher',
     source: 'npms',
     path: 'collected.metadata.publisher',
     rawFn: 'ident',
     displayFn: 'publisher',
     component: 'Simple',
  },
  maintainers: {
     label: 'Maintainers',
     source: 'npms',
     path: 'collected.metadata.maintainers',
     rawFn: 'ident',
     displayFn: 'count',
     component: 'Simple',
  },
  repository: {
     label: 'Repository',
     source: 'npms',
     path: 'collected.metadata.links.repository',
     rawFn: 'ident',
     displayFn: 'ident',
     component: 'Link',
  },
  npm: {
     label: 'NPM',
     source: 'npms',
     path: 'collected.metadata.links.npm',
     rawFn: 'ident',
     displayFn: 'ident',
     component: 'Link',
  },
  homepage: {
     label: 'Homepage',
     source: 'npms',
     path: 'collected.github.homepage',
     rawFn: 'ident',
     displayFn: 'ident',
     component: 'Link',
  },
  bugs: {
     label: 'Bugs',
     source: 'npms',
     path: 'collected.metadata.links.bugs',
     rawFn: 'ident',
     displayFn: 'ident',
     component: 'Link',
  },
  license: {
     label: 'License',
     source: 'npms',
     path: 'collected.metadata.license',
     rawFn: 'ident',
     displayFn: 'ident',
     component: 'Simple',
  },
  dependencies: {
     label: 'Dependencies',
     source: 'npms',
     path: 'collected.metadata.dependencies',
     rawFn: 'ident',
     displayFn: 'count',
     component: 'Simple',
  },
  releases: {
     label: 'Releases',
     source: 'npms',
     path: 'collected.metadata.releases',
     rawFn: 'ident',
     displayFn: 'releases',
     component: 'Simple',
  },
  readme: {
     label: 'Readme',
     source: 'npms',
     path: 'collected.metadata.readme',
     rawFn: 'ident',
     displayFn: 'shorten20chars',
     component: 'Simple',
  },
  downloads: {
     label: 'Downloads',
     source: 'npms',
     path: 'collected.npm.downloads',
     rawFn: 'ident',
     displayFn: 'downloads',
     component: 'Simple',
  },
  dependentsCount: {
     label: 'Dependents count',
     source: 'npms',
     path: 'evaluation.popularity.dependentsCount',
     rawFn: 'ident',
     displayFn: 'ident',
     component: 'Simple',
  },
  starsCount: {
     label: 'Stars count',
     source: 'npms',
     path: 'collected.github.starsCount',
     rawFn: 'ident',
     displayFn: 'ident',
     component: 'Simple',
  },
  forksCount: {
     label: 'Forks count',
     source: 'npms',
     path: 'collected.github.forksCount',
     rawFn: 'ident',
     displayFn: 'ident',
     component: 'Simple',
  },
  subscribersCount: {
     label: 'Subscribers count',
     source: 'npms',
     path: 'collected.github.subscribersCount',
     rawFn: 'ident',
     displayFn: 'ident',
     component: 'Simple',
  },
  count: {
     label: 'Count',
     source: 'npms',
     path: 'collected.github.issues.count',
     rawFn: 'ident',
     displayFn: 'ident',
     component: 'Simple',
  },
  openCount: {
     label: 'Open count',
     source: 'npms',
     path: 'collected.github.issues.openCount',
     rawFn: 'ident',
     displayFn: 'ident',
     component: 'Simple',
  },
  distribution: {
     label: 'Average open issue duration',
     source: 'npms',
     path: 'collected.github.issues.distribution',
     rawFn: 'ident',
     displayFn: 'averageOpenIssueDuration',
     component: 'Simple',
  },
  isDisabled: {
     label: 'Is disabled',
     source: 'npms',
     path: 'collected.github.issues.isDisabled',
     rawFn: 'ident',
     displayFn: 'ident',
     component: 'Simple',
  },
  contributors: {
     label: 'Contributors',
     source: 'npms',
     path: 'collected.github.contributors',
     rawFn: 'ident',
     displayFn: 'paretoContributors',
     component: 'Simple',
  },
  commits: {
     label: 'Commits',
     source: 'npms',
     path: 'collected.github.commits',
     rawFn: 'ident',
     displayFn: 'commits',
     component: 'Simple',
  },
  readmeSize: {
     label: 'Readme size',
     source: 'npms',
     path: 'collected.source.files.readmeSize',
     rawFn: 'ident',
     displayFn: 'ident',
     component: 'Simple',
  },
  testsSize: {
     label: 'Tests size',
     source: 'npms',
     path: 'collected.source.files.testsSize',
     rawFn: 'ident',
     displayFn: 'ident',
     component: 'Simple',
  },
  hasNpmIgnore: {
     label: 'Has npm ignore',
     source: 'npms',
     path: 'collected.source.files.hasNpmIgnore',
     rawFn: 'ident',
     displayFn: 'ident',
     component: 'Simple',
  },
  hasChangelog: {
     label: 'Has changelog',
     source: 'npms',
     path: 'collected.source.files.hasChangelog',
     rawFn: 'ident',
     displayFn: 'ident',
     component: 'Simple',
  },
  linters: {
     label: 'Linters',
     source: 'npms',
     path: 'collected.source.linters',
     rawFn: 'ident',
     displayFn: 'linters',
     component: 'Simple',
  },
  carefulness: {
     label: 'Carefulness',
     source: 'npms',
     path: 'evaluation.quality.carefulness',
     rawFn: 'ident',
     displayFn: 'percent',
     component: 'Simple',
  },
  tests: {
     label: 'Tests',
     source: 'npms',
     path: 'evaluation.quality.tests',
     rawFn: 'ident',
     displayFn: 'percent',
     component: 'Simple',
  },
  health: {
     label: 'Health',
     source: 'npms',
     path: 'evaluation.quality.health',
     rawFn: 'ident',
     displayFn: 'percent',
     component: 'Simple',
  },
  branding: {
     label: 'Branding',
     source: 'npms',
     path: 'evaluation.quality.branding',
     rawFn: 'ident',
     displayFn: 'percent',
     component: 'Simple',
  },
  communityInterest: {
     label: 'Community interest',
     source: 'npms',
     path: 'evaluation.popularity.communityInterest',
     rawFn: 'ident',
     displayFn: 'ident',
     component: 'Simple',
  },
  downloadsCount: {
     label: 'Downloads count',
     source: 'npms',
     path: 'evaluation.popularity.downloadsCount',
     rawFn: 'ident',
     displayFn: 'ident',
     component: 'Simple',
  },
  downloadsAcceleration: {
     label: 'Downloads acceleration',
     source: 'npms',
     path: 'evaluation.popularity.downloadsAcceleration',
     rawFn: 'ident',
     displayFn: 'ident',
     component: 'Simple',
  },
  releasesFrequency: {
     label: 'Releases frequency',
     source: 'npms',
     path: 'evaluation.maintenance.releasesFrequency',
     rawFn: 'ident',
     displayFn: 'percent',
     component: 'Simple',
  },
  commitsFrequency: {
     label: 'Commits frequency',
     source: 'npms',
     path: 'evaluation.maintenance.commitsFrequency',
     rawFn: 'ident',
     displayFn: 'percent',
     component: 'Simple',
  },
  openIssues: {
     label: 'Open issues',
     source: 'npms',
     path: 'evaluation.maintenance.openIssues',
     rawFn: 'ident',
     displayFn: 'percent',
     component: 'Simple',
  },
  issuesDistribution: {
     label: 'Issues distribution',
     source: 'npms',
     path: 'evaluation.maintenance.issuesDistribution',
     rawFn: 'ident',
     displayFn: 'percent',
     component: 'Simple',
  },
  final: {
     label: 'Final',
     source: 'npms',
     path: 'score.final',
     rawFn: 'ident',
     displayFn: 'percent',
     component: 'Simple',
  },
  quality: {
     label: 'Quality',
     source: 'npms',
     path: 'score.detail.quality',
     rawFn: 'ident',
     displayFn: 'percent',
     component: 'Simple',
  },
  popularity: {
     label: 'Popularity',
     source: 'npms',
     path: 'score.detail.popularity',
     rawFn: 'ident',
     displayFn: 'percent',
     component: 'Simple',
  },
  maintenance: {
     label: 'Maintenance',
     source: 'npms',
     path: 'score.detail.maintenance',
     rawFn: 'ident',
     displayFn: 'percent',
     component: 'Simple',
  },
};