import isEmpty from "lodash/isEmpty";
import store from "../logic/store";

export default () => {
  if( ! isEmpty(store.get()) ) return;
  store.set({
    data: {},
    selection: [],
    focus: undefined,
    color: {
      hues: [0, 120, 240, 60, 330, 180, 90, 270, 30, 150, 300, 210],
      hue: 70,
      saturation: 40,
      lightness: 70,
    },
    user: {
      helpTooltips: {},
      needsHelp: true,
    }
  });
}