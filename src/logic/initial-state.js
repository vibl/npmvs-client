export default {
  data: {},
  packages: {},
  charts: {},
  selection: [],
  focus: undefined,
  color: {
    hues: [0, 120, 240, 60, 330, 180, 90, 270, 30, 150, 300, 210],
    hue: 70,
    saturation: 40,
    lightness: 70,
  },
  session: {
    isNewbie: true,
    language: 'en',
    components: {
      IssuesClosedInLessThanXdays: 3,
      Contributors: 3,
      ActivityScore: 3,
    }
  },
  ui: {
    columnsHeight: {},
    displayPackId: '',
  },
};