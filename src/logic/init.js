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
  });
}