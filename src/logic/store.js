import { createStore } from 'redux';
import stringifier from 'stringifier';

const {transform} = require('./vibl-pure').default;

const reducer = (state, {payload}) => payload ? transform(payload, state) : state;

const store = createStore(reducer, {},
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),);

function set(payload) {
  store.dispatch({type: 'SET', payload, debug: stringifier.stringify(payload)});
};

export default {
  get: store.getState,
  set,
  store,
}
