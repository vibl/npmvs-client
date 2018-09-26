import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web and AsyncStorage for react-native
import saga from '../logic/sagas'
const {assocDotPath, getDotPath, transform} = require('../util/vibl-fp').default;

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['session', 'color'],
};
const reducer = (state, {payload}) => {
  let newState = payload ? transform(payload, state) : state;
  // if( payload && payload.path && payload.path.includes('blinkers') ) {
  //   console.log('Reducer: old state:', state, '\npayload:', payload, '\nnew state:', newState);
  // }
  return newState;
};
const persistedReducer = persistReducer(persistConfig, reducer);

let store = {}, persistor;

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const initRedux = (initialData) => {
  const sagaMiddleware = createSagaMiddleware();
  store = createStore(
    persistedReducer,
    initialData,
    composeEnhancers(applyMiddleware(sagaMiddleware)),
  );
  persistor = persistStore(store);
  sagaMiddleware.run(saga);
  return {
    reduxStore: store,
    persistor,
  };
};
const set = (payload) => {
  store.dispatch({type: 'SET', payload});
};
const detect = (path) => new Promise( (resolve) => {
  const resolveWhenValue = () => {
    const state = store.getState();
    const value = getDotPath(path, state);
    if( value ) resolve(value);
  };
  store.subscribe(resolveWhenValue);
});
function watch(path, onChange) {
  let previousValue;

  function handleChange() {
    let nextValue = getDotPath(path, store.getState());
    if (nextValue !== previousValue) {
      onChange(previousValue, nextValue);
      previousValue = nextValue;
    }
  }
  let unsubscribe = store.subscribe(handleChange);
  handleChange();
  return unsubscribe;
}
export default {
  get: (...args) => store.getState(...args),
  set,
  detect,
  watch,
}