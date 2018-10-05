export default {
  selection: [],
  color: {
    hues: [0, 120, 240, 60, 330, 180, 90, 270, 30, 150, 300, 210],
    hue: 70,
    saturation: 40,
    lightness: 70,
  },
  session: {
    user: {
      blinkers: {},
    },
    isNewbie: true,
    language: 'en',
    components: {
      ReleasesForPeriod: 2,
      IssuesClosedInLessThanXdays: 2,
      Contributors: 2,
      DownloadsSeries: 2,
    }
  },
  ui: {
    columnsHeight: {},
    displayHide: {},
    focus: undefined,
  },
};