import store from "./store";
import {selectionFromUrlPath} from './router-utils';
import sources from '../data/sources/index';
import {setFocus, unsetFocus} from "../logic/focus";
import {append, difference, map, pipe, values} from 'ramda';
const {discard} = require('../logic/vibl-fp').default;

const add = async (packId) => {
  store.set({selection: append(packId)});
  await Promise.all(  // Promises should be executed in parallel. No need for the return values.
    values(map( source => source.getData(packId), sources))
  );
  setFocus(packId);
};
const remove = async (packId) => {
  store.set({selection: discard(packId)});
  unsetFocus(packId);
};
export const setSelection = (newSelection) => {
  const currentSelection = store.get().selection;
  difference(currentSelection, newSelection).map(remove);
  difference(newSelection, currentSelection).map(add);
};
export const updateSelection = (path) => {
  const selection = selectionFromUrlPath(path);
  setSelection(selection);
};