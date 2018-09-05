import { createStore } from 'redux';
const {transform} = require('./vibl-pure').default;

const reducer = (state, {payload}) => payload ? transform(payload, state) : state;

const store = createStore(reducer, {},
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),);

const set = (payload) => store.dispatch({type: 'SET', payload});

export default {
  get: store.getState,
  set,
  store,
}
