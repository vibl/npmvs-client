import {map, pipe} from 'ramda';
import state from "./store";
import {selectionFromUrlPath} from './router-utils';
import packageData from "../data/package-data";
const {added, removed, collect} = require('./vibl-fp').default;

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