import { createStore, applyMiddleware, compose } from 'redux'
const R = require('lib/vibl/ramda');

const reduction = {};

function reducer(state, action) {
  for(let type in reduction) {
    if( action.type === type ) {
      return reduction[type](action.payload)(state);
    }
  }
}

export const newStore = (initialState) => createStore(
  reducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

function createAction(type, fn) {
  reduction[type] = fn;
  return (...args) => {
    const payload = args.length > 1 ? args : args[0];
    store.dispatch({type, payload});
  };
}

export const transform = createAction('TRANSFORM', R.transform);
export const assoc = createAction('ASSOC', (payload) => R.assocDotPath(...payload));
