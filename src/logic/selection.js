import {map, pipe} from 'ramda';
import state from "./store";
import {selectionFromUrlPath} from './router-utils';
import packageData from "./package-data";
const {added, removed, collect} = require('../logic/vibl-pure').default;

const set = (newSelection) => {
  const currentSelection = state.get().selection;
  collect(
    pipe(added, map(packageData.add)),
    pipe(removed, map(packageData.remove)),
  )(currentSelection, newSelection);
};
const update = pipe(
  selectionFromUrlPath,
  set,
);
export default {
  set,
  update,
}