import isEmpty from "lodash/isEmpty";
import state from "./store";

export default () => {
  if( ! isEmpty(state.get()) ) return;
  // const compDataInitReducer = (field, id) => ({
  //   meta: {
  //     id,
  //     ...field,
  //   },
  //   data: {},
  // });
  // const fields = mapObjIndexed(compDataInitReducer)(fieldsSpecs);
  // fields.downloadsChart.data.downloadsData = [];
  state.set({
    packages: {},
    charts: {},
    selection: [],
    color: {
      hues: [0, 120, 240, 60, 330, 180, 90, 270, 30, 150, 300, 210],
      hueOffset: 0,
      saturation: 50,
      lightness: 50,
    }
  });
}