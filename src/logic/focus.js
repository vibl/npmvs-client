import state from "./store";
import {last} from 'ramda';
const {discard} = require('./vibl-fp');

export const setFocus = (packId) => {
  state.set({focus: packId});
};
export const unsetFocus = (packId) => {
  const selection = state.get().selection;
  const newFocus = last(discard(packId, selection));
  state.set({focus: newFocus});
};

