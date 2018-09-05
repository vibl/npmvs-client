export default {
  npmDownloads: {
    range: {
      params: {
        timeFrame: '2017-08-28:2018-08-28',
      },
      extractTree: {
        downloads: 1,
      },
    },
  },
  npms: {
    package: {
      params: {},
      extractTree: {
        collected: {
          metadata: {
            name: 1,
            version: 1,
            description: 1,
            keywords: 1,
            author: 1,
            publisher: 1,
            maintainers: 1,
            repository: 1,
            links: {
              npm: 2,
              homepage: 2,
              repository: 2,
              bugs: 2,
            },
            license: 1,
            dependencies: 1,
            releases: 1,
            readme: 1,
          },
          github: {
            homepage: 2,
            forksCount: 1,
            subscribersCount: 1,
            issues: {
              distribution: 2,
            },
            contributors: 1,
            commits: 1,
          },
        },
      },
    },
  },
};