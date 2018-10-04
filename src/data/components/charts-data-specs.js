
export default {
  'DownloadsSeries:{packId}': [
    {
      id: 'downloads',
      datapoint: 'downloads',
      extractFn: ({data}) => data.downloads.map(a => ({month: a[0], value: a[1]})),
    }
  ],
  'GitHubScore:{packId}': [
    {
      id: 'starsCount',
      datapoint: 'starsCount',
    },
    {
      id: 'forksCount',
      datapoint: 'forksCount',
    },
    {
      id: 'subscribersCount',
      datapoint: 'subscribersCount',
    },
  ],
  'DependentReposCount:{packId}': [
    {
      id: 'dependentReposCount',
      datapoint: 'dependentReposCount',
    },
  ],
  'ReleasesForPeriod:{packId}': [
    {
      id: 'releases',
      datapoint: 'releasesForPeriod',
    },
  ],
  'ClosedIssuesRatio:{packId}': [
    {
      id: 'openIssuesCount',
      datapoint: 'openIssuesCount',
    },
    {
      id: 'totalIssuesCount',
      datapoint: 'totalIssuesCount',
    },
  ],
  'IssuesClosedInLessThanXdays:{packId}': [
    {
      id: 'issues_distribution',
      datapoint: 'issuesDistribution',
    },
  ],
  'Contributors:{packId}': [
    {
      id: 'contributors',
      datapoint: 'contributors',
    },
  ],

  /*
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
   */
};