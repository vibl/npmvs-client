import isEmpty from "lodash/isEmpty";
import store from "./store";

export default () => {
  if( ! isEmpty(store.get()) ) return;

  store.set({
    packages: {},
    charts: {},
    selection: [],
    focus: undefined,
    color: {
      hues: [0, 120, 240, 60, 330, 180, 90, 270, 30, 150, 300, 210],
      hue: 70,
      saturation: 40,
      lightness: 70,
    }
  });
}