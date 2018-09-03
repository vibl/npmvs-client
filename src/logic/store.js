import { createStore } from 'redux';
const {transform} = require('./vibl-pure').default;

const reducer = (state, {payload}) => payload ? transform(payload, state) : state;

export const store = createStore(reducer, {},
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),);

export const set = (payload) => store.dispatch({type: 'SET', payload});
