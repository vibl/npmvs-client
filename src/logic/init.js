import isEmpty from "lodash/isEmpty";
import {keys} from "ramda";
import state from "./store";
import dataFields from './data-fields';

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
    chartsList: [],
    selection: [],
    focus: undefined,
    color: {
      hues: [0, 120, 240, 60, 330, 180, 90, 270, 30, 150, 300, 210],
      hueOffset: 70,
      saturation: 40,
      lightness: 70,
    }
  });
}