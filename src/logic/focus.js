import store from "../data/store";
import {last} from 'ramda';
const {discard} = require('../util/vibl-fp');

export const setFocus = (packName) => {
  store.set({'ui:focus': packName});
};
export const unsetFocus = (packName) => {
  const selection = store.get().selection;
  const newFocus = last(discard(packName, selection));
  store.set({'ui:focus': newFocus});
};

