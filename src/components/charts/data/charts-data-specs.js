import {extractReleasesCount} from './extractFns';

export default {
  'data:GitHubScore:{packId}': [
    {
      id: 'starsCount',
      datapoint: 'stars',
    },
    {
      id: 'forksCount',
      datapoint: 'forks',
    },
  ],
  'data:DependentReposCount:{packId}': [
    {
      id: 'dependentReposCount',
      datapoint: 'dependent_repos_count',
    },
  ],
  'data:ReleasesForPeriod:{packId}': [
    {
      id: 'releases',
      datapoint: 'versions',
      extractFn: extractReleasesCount,
    },
  ],

  // 'data:ClosedIssuesRatio:{packId}': [
  //   {
  //     id: 'issues_openCount',
  //     datapoint: 'issues_openCount',
  //   },
  //   {
  //     id: 'issues_count',
  //     datapoint: 'issues_count',
  //   },
  // ],
  // 'data:Contributors:{packId}': [
  //   {
  //     id: 'contributors',
  //     datapoint: 'contributors',
  //   },
  // ],
  // 'data:IssuesClosedInLessThanXdays:{packId}': [
  //   {
  //     id: 'issues_distribution',
  //     datapoint: 'issues_distribution',
  //   },
  // ],
};