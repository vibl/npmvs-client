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
  monthlyDownloadsSeries: {
    label: 'Monthly downloads in the last year',
    description: `
Values are adjusted for average month duration.\n
In other words, this chart displays what monthly downloads would be if each month lasted 30.41 days (365/12).\n
This is to avoid displaying variations merely due to month durations (30, 31 or 28).`,
    dataPoint: 'downloads',
    component: 'LineChart',
  },
  downloadsAverageGrowth: {
    label: 'Downloads growth in the last year',
    description: `
-> *(Number of downloads during last trimester)* <-\n
-> divided by <-\n
-> *(Number of downloads during the same trimester the year before)* <-`,
    dataPoint: 'downloads',
    computeFn: 'downloadsAverageGrowth',
    displayFn: 'significanPercentDisplay|explicitPlus',
    component: 'BarChart',
  },
  downloadsAcceleration: {
    label: 'Downloads acceleration in the last year',
    description: `
Calculated with a very simple algorithm:\n
1. The period is divided in three equals parts (here: 12/3 = 4 months periods).
2. Sums of downloads in each period: \`sum1, sum2, sum3\`
3. Deltas betweens the periods (i.e. measure of growth) :   
\`delta1 = sum2 - sum1\`   
\`delta2 = sum3 - sum2\`
4. \`acceleration = delta2 / delta1\`
`,
    dataPoint: 'downloads',
    computeFn: 'downloadsAcceleration',
    displayFn: 'significanPercentDisplay|explicitPlus',
    component: 'BarChart',
  },
  closedIssuesRatio: {
    label: 'Percent of closed issues',
    description: `
-> *(Number of closed issues)* <-\n
-> divided by <-\n
-> *(Total number of issues)* <-\n
<small>This is more relevant than just counting open issues   
because it takes into account the size of the project.   
Also, some types of projects just generate more issues   
 than others.</small>
`,
    dataPoint: 'issues',
    computeFn: 'closedIssuesRatio',
    displayFn: 'significanPercentDisplay',
    component: 'BarChart',
  },
  percentIssuesClosedIn3daysOrLess: {
    label: 'Percent of issues closed in 3 days or less',
    description: `
-> *(Number of issues that where closed less than three days after they were open)* <-\n
-> divided by <-\n
-> *(Total number of issues)* <-
<small>In open source project, issues are usually closed when they are resolved. One exception to that rule
would be issues that are used for deliberation for long-running decisions. However, those are usually
rare and wouldn't affect this ratio much.</small>
`,
    dataPoint: 'issues',
    computeFn: 'percentIssuesClosedIn3daysOrLess',
    displayFn: 'significanPercentDisplay',
    component: 'BarChart',
  },
  contributors: {
    label: 'Contributors with more than 2 commits',
    description: `
Contributors with one or two commits are not usually much involved in maintaining the project. \n
However, their number can skew the total count of contributors by a large margin. The number 2 is pretty arbitrary, 
but it already cuts the number by half or more in some cases. We might change it later.\n
In a future version of NPMvs, we will use *additions* (i.e. lines of code) to the project, as a better measure
 of contribution.`,
    dataPoint: 'contributors',
    computeFn: 'contributorsWithMoreThan2commits',
    component: 'BarChart',
  },
  commits12months: {
    label: 'Number of commits in the last year',
    description: `
When this number is high, it just shows that the project is somewhat active (but comparing
it between projects would be pretty meaningless).\n
When the number is close to 0, it definitely is a bad sign...`,
    dataPoint: 'commits',
    computeFn: 'commits12months',
    component: 'BarChart',
  },
};