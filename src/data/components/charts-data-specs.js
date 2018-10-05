
export default {
  'DownloadsSeries:{packName}': [
    {
      id: 'downloads',
      datapoint: 'downloads',
      extractFn: ({data}) => data.downloads.map(a => ({month: a[0], value: a[1]})),
    }
  ],
  'GitHubScore:{packName}': [
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
  'DependentReposCount:{packName}': [
    {
      id: 'dependentReposCount',
      datapoint: 'dependentReposCount',
    },
  ],
  'ReleasesForPeriod:{packName}': [
    {
      id: 'releases',
      datapoint: 'releasesForPeriod',
    },
  ],
  'ClosedIssuesRatio:{packName}': [
    {
      id: 'openIssuesCount',
      datapoint: 'openIssuesCount',
    },
    {
      id: 'totalIssuesCount',
      datapoint: 'totalIssuesCount',
    },
  ],
  'IssuesClosedInLessThanXdays:{packName}': [
    {
      id: 'issues_distribution',
      datapoint: 'issuesDistribution',
    },
  ],
  'Contributors:{packName}': [
    {
      id: 'contributors',
      datapoint: 'contributors',
    },
  ],

  /*
    'MedianResolutionTime:{packName}': [
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