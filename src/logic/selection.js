import store from "../data/store";
import {selectionFromUrlPath} from './router';
import {fetchDataForPackage} from '../data/get-data';
import {setFocus, unsetFocus} from "../logic/focus";
import {append, difference, last, map, pipe, values} from 'ramda';
const {discard} = require('../util/vibl-fp').default;

const add = async (packName) => {
  store.set({selection: append(packName)});
  await fetchDataForPackage(packName);
  setFocus(packName);
};
const remove = async (packName) => {
  store.set({selection: discard(packName)});
  if( store.get().ui.focus === packName ) {
    const lastSelected = last(store.get().selection);
    if( lastSelected ) {
      setFocus(lastSelected);
    }
  }
  unsetFocus(packName);
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