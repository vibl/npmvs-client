import {extractReleasesCount} from './extractFns';

export default {
  'GitHubScore:{packId}': [
    {
      id: 'starsCount',
      datapoint: 'stars',
    },
    {
      id: 'forksCount',
      datapoint: 'forks',
    },
  ],
  'DependentReposCount:{packId}': [
    {
      id: 'dependentReposCount',
      datapoint: 'dependent_repos_count',
    },
  ],
  'ReleasesForPeriod:{packId}': [
    {
      id: 'releases',
      datapoint: 'versions',
      extractFn: extractReleasesCount,
    },
  ],

  // 'ClosedIssuesRatio:{packId}': [
  //   {
  //     id: 'issues_openCount',
  //     datapoint: 'issues_openCount',
  //   },
  //   {
  //     id: 'issues_count',
  //     datapoint: 'issues_count',
  //   },
  // ],
  // 'Contributors:{packId}': [
  //   {
  //     id: 'contributors',
  //     datapoint: 'contributors',
  //   },
  // ],
  // 'IssuesClosedInLessThanXdays:{packId}': [
  //   {
  //     id: 'issues_distribution',
  //     datapoint: 'issues_distribution',
  //   },
  // ],
};