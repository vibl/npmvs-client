import store from "./store";
import {selectionFromUrlPath} from './router-utils';
import sources from '../data/sources';
import {setFocus, unsetFocus} from "../logic/focus";
import {displayInfoPage, hideInfoPage} from '../components/infopage/infopage-display-hide';
import {append, difference, last, map, pipe, values} from 'ramda';
const {discard} = require('../logic/vibl-fp').default;

const add = async (packId) => {
  store.trans({selection: append(packId)});
  await Promise.all(  // Promises should be executed in parallel. No need for the return values.
    values(
      map( 
          source => source.getData(packId),
          sources
        )
      )
  );
  setFocus(packId);
};
const remove = async (packId) => {
  store.trans({selection: discard(packId)});
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