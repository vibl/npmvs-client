export default [
  {
    fieldId: 'closedIssuesRatio',
    component: 'BarChart',

  },
  {
    fieldId: 'percentIssuesClosedIn3daysOrLess',
    component: 'BarChart',
    gridArea: 'b'
  },
  {
    fieldId: 'contributors',
    component: 'BarChart',
    gridArea: 'c'
  },
  {
    fieldId: 'commits12months',
    component: 'BarChart',
    gridArea: 'd'
  },
  {
    fieldId: 'downloadsGrowth',
    component: 'BarChart',
    gridArea: 'e'
  },
  {
    fieldId: 'downloadsAcceleration',
    component: 'BarChart',
    gridArea: 'f'
  },
  {
    fieldId: 'monthlyDownloadsSeries',
    component: 'LineChart',
    gridArea: 'g'
  },
];