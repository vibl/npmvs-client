import { createStore } from 'redux';
import stringifier from 'stringifier';

const {transform} = require('./vibl-pure').default;

const reducer = (state, {payload}) => payload ? transform(payload, state) : state;

const store = createStore(reducer, {},
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),);

function set(payload) {
  console.log("state.set() payload:", stringifier.stringify(payload));
  store.dispatch({type: 'SET', payload});
};

export default {
  get: store.getState,
  set,
  store,
}
