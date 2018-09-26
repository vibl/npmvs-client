import store from "../data/store";
import {last} from 'ramda';
const {discard} = require('../util/vibl-fp');

export const setFocus = (packId) => {
  store.set({focus: packId});
};
export const unsetFocus = (packId) => {
  const selection = store.get().selection;
  const newFocus = last(discard(packId, selection));
  store.set({focus: newFocus});
};

