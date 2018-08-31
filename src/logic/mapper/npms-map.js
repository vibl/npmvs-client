import {last} from 'ramda';
import {count, ident, none, joinComma} from "./mapper";

// Number of contributors who have contributed 80% of the commits.
const paretoContributors = list => {
  const first = list.shift().commitsCount;
  // Accumulate sums of commits.
  const sums = list.reduce( (acc, o) => [...acc, last(acc) + o.commitsCount], [first]);
  const total = last(sums);
  // Count contributors until 80% of commits are reached.
  return sums.reduce( (acc, val) => val/total <= 0.8 ? acc + 1 : acc, 0);
};

const npmsMap = {
  collected: {
    metadata: {
      name:  ident,
      scope: ident,
      version: ident,
      description: ident,
      keywords: joinComma,
      date: none,
      author: (o) => o.name,
      publisher: (o) => o.username,
      maintainers: count,
      repository: (o) => o.url,
      links: {
        "npm": ident,
        "homepage": ident,
        "repository": ident,
        "bugs": ident
      },
      license: none,
      dependencies: count,
      releases: (a) => a[3].count,
      readme: none,
    },
    npm: {
      downloads: (a) => a[5].count,
      dependentsCount:  ident,
      starsCount: none,
    },
    github: {
      homepage: ident,
      starsCount: ident,
      forksCount: ident,
      subscribersCount: ident,
      issues: {
        count: ident,
        openCount: ident,
        distribution: none,
        isDisabled: ident
      },
      contributors: paretoContributors,
      commits: (a) => a[4].count,
      statuses: none,
    },
    source: {
      files: {
        readmeSize: ident,
        testsSize: ident,
        hasNpmIgnore: ident,
        hasChangelog: ident
      },
      badges: none,
      linters: o => o.js && o.js[0],
    }
  },
  evaluation: {
    quality: {
      carefulness: ident,
      tests: ident,
      health: ident,
      branding: ident
    },
    popularity: {
      communityInterest: ident,
      downloadsCount: ident,
      downloadsAcceleration: ident,
      dependentsCount: ident
    },
    maintenance: {
      releasesFrequency: ident,
      commitsFrequency: ident,
      openIssues: ident,
      issuesDistribution: ident
    }
  },
  score: {
    final: ident,
    detail: {
      quality: ident,
      popularity: ident,
      maintenance: ident
    }
  }
};

export default npmsMap;