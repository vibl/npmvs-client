import store from "../data/store";
import {selectionFromUrlPath} from './router';
import {setFocus, unsetFocus} from "../logic/focus";
import fetchData from '../data/sources/source_npmvs.js';
// import Spinner from '../components/appbar/Spinner';
import {append, concat, difference, last, map, omit, pipe, values, without} from 'ramda';

const addPackages = async (packNames) => {
  store.set({'ui:spinner': true});
  store.set({selection: concat(packNames)});
  await Promise.all( packNames.map(packName => fetchData(packName)));
  setFocus(packNames[0]);
  store.set({'ui:spinner': false})
};
const removePackages = async (packNames) => {
  store.set({
    selection: without(packNames),
    components: map(omit(packNames)),
  });
  setFocus(0);
};
export const setSelection = (newSelection) => {
  const currentSelection = store.get().selection;
  const removedPackages =  difference(currentSelection, newSelection);
  if( removedPackages.length > 0 ) removePackages(removedPackages);
  const addedPackages = difference(newSelection, currentSelection);
  if( addedPackages.length > 0 ) addPackages(addedPackages);
};
export const updateSelection = (path) => {
  const selection = selectionFromUrlPath(path);
  setSelection(selection);
};