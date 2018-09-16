import { createStore } from 'redux';
import stringifier from 'stringifier';

const {transform} = require('./vibl-fp').default;

const reducer = (state, {payload}) => payload ? transform(payload, state) : state;

export const redux = createStore(reducer, {},
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),);

function set(payload) {
  redux.dispatch({type: 'SET', payload, debug: stringifier.stringify(payload)});
};

export default {
  get: redux.getState,
  set,
}
