import { createStore } from 'redux'
const {transform} = require('./vibl-pure').default

const reducer = (state, {payload}) => {
  return payload ? transform(payload, state) : state
};

export const store = createStore(
  reducer,
  {},
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);
export function set(payload) {
  return store.dispatch({type: 'SET', payload});
}
