import {append, mapObjIndexed, pipe, values} from 'ramda';
import http from './http';
import state from './store';
import dataPoints from '../config/data-points';
import sources from '../config/sources/index';
import {setFocus, unsetFocus} from "./focus";

const {discard} = require('./vibl-pure');

const addEndpointData = async (packId, source, [{params, extractTree}, endpoint]) => {
  const {stateTransformer, urlBuilder} = sources[source];
  const url = urlBuilder[endpoint](packId, params);
  const resp = await http.memGet(url);
  const transformer = stateTransformer.adding(packId, resp.data, extractTree);
  state.set(transformer);
};
const add = async (packId) => {
  state.set({selection: append(packId)});
  for(let source in dataPoints) {
    const endpoints = dataPoints[source];
    // Promises should be executed in parallel. No need for the return values.
    await Promise.all(
      pipe(
        mapObjIndexed( (...args) => addEndpointData(packId, source, args) ),
        values,
      )(endpoints)
    );
  }
  setFocus(packId);
};
// We don't need this. Keeping data in the store is harmless.
// const removeEndpointData = async (packId, source) => {
//   const {stateTransformer} = sources[source];
//   const transformer = stateTransformer.removing(packId);
//   state.set(transformer);
// };
const remove = async (packId) => {
  state.set({selection: discard(packId)});
  unsetFocus(packId);
  // for(let source in dataPoints) {
  //   const endpoints = dataPoints[source];
  //   // Promises should be executed in parallel. No need for the return values.
  //   await Promise.all(
  //     pipe(
  //       mapObjIndexed( () => removeEndpointData(packId, source)),
  //       values,
  //     )(endpoints)
  //   );
  // }
};
export default {
  add,
  remove,
};