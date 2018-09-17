import store from '../logic/store';
import sources from '../data/sources/index';
import {setFocus, unsetFocus} from "../logic/focus";
import {append} from 'ramda';
const {discard} = require('../logic/vibl-fp');

const add = async (packId) => {
  store.set({selection: append(packId)});
  await Promise.all(  // Promises should be executed in parallel. No need for the return values.
    sources.map( o => o.getData )
  );
  setFocus(packId);
};
const remove = async (packId) => {
  store.set({selection: discard(packId)});
  unsetFocus(packId);
};
export default {
  add,
  remove,
};