import {keys, mapObjIndexed, pipe, values} from 'ramda';
import http from './http';
import dataPoints from './data-points';
import state from './store';
import sources from './sources/index';

const addEndpointData = async (packName, source, [{params, extractTree}, endpoint]) => {
  const {stateTransformers, urlBuilder} = sources[source];
  const url = urlBuilder[endpoint](packName, params);
  const resp = await http.memGet(url);
  const transformer = stateTransformers.adding(packName, resp.data, extractTree);
  return state.set(transformer);
};
const add = async (packName) => {
  for(let source in dataPoints) {
    const endpoints = dataPoints[source];
    // Promises should be executed in parallel. No need for the return values.
    Promise.all(
      pipe(
        mapObjIndexed( (...args) => addEndpointData(packName, source, args) ),
        values,
      )(endpoints)
    );
  }
};
const removeEndpointData = async (packName, source, [endpoint, {params, extractTree}]) => {
  const {stateTransformers} = sources[source];
  const transformer = stateTransformers.removing(packName);
  return state.set(transformer);
};
const remove = async (packName) => {
  for(let source in dataPoints) {
    const endpoints = dataPoints[source];
    // Promises should be executed in parallel. No need for the return values.
    await Promise.all(
      pipe(
        mapObjIndexed( (...args) => removeEndpointData(packName, source, args)),
        values,
      )(endpoints)
    );
  }
};
export default {
  add,
  remove,
};