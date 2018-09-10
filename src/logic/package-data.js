import {append, keys, mapObjIndexed, pipe, values} from 'ramda';
import http from './http';
import state from './store';
import dataPoints from './data-points';
import sources from './sources/index';
import dataFields from "./data-fields";
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
};
const removeEndpointData = async (packId, source) => {
  const {stateTransformer} = sources[source];
  const transformer = stateTransformer.removing(packId);
  state.set(transformer);
};
const remove = async (packId) => {
  state.set({selection: discard(packId)});
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