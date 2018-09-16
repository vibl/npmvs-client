import { createStore } from 'redux';
import stringifier from 'stringifier';

const {transform} = require('./vibl-fp').default;

const reducer = (state, {payload}) => payload ? transform(payload, state) : state;

let reduxStore = {};

export const initRedux = (initialData) => {
  reduxStore = createStore(
    reducer,
    initialData,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  );
  return reduxStore;
};

function set(payload) {
  reduxStore.dispatch({type: 'SET', payload, debug: stringifier.stringify(payload)});
};

export default {
  get: (...args) => reduxStore.getState(...args),
  set,
}
