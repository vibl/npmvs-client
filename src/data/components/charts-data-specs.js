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
  'ClosedIssuesRatio:{packId}': [
    {
      id: 'closedPercent',
      datapoint: 'openPercent',
      extractFn: ({value}) => 100 - parseInt(value),

    },
  ],
  'MedianResolutionTime:{packId}': [
    {
      id: 'medianResolutionTime',
      datapoint: 'resolution',
      extractFn: ({value}) => {
        const [_, str, unit] = value.match(/(\d+) ?(\w+)$/);
        const n =  parseInt(str);
        let days;
        switch(unit) {
          case 'd':
            days = n;
            break;
          case 'h':
            days = n / 24;
          default:
            throw new Error('Unit of medianResolutionTime was not identified:', unit);
        }
        return days;
      }

    },
  ],

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