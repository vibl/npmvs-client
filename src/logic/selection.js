import store from "../data/store";
import {selectionFromUrlPath} from './router';
import {fetchDataForPackage} from '../data/get-data';
import {setFocus, unsetFocus} from "../logic/focus";
import {displayInfoPage, hideInfoPage} from '../components/infopage/infopage-display-hide';
import {append, difference, last, map, pipe, values} from 'ramda';
const {discard} = require('../util/vibl-fp').default;

const add = async (packId) => {
  store.set({selection: append(packId)});
  await fetchDataForPackage(packId);
  setFocus(packId);
};
const remove = async (packId) => {
  store.set({selection: discard(packId)});
  unsetFocus(packId);
  if( store.get().ui.displayPackId === packId ) {
    const lastSelected = last(store.get().selection);
    if( lastSelected ) {
      displayInfoPage(lastSelected);
    } else {
      hideInfoPage();
    }
  }
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