import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native

const {assocDotPath, transform} = require('./vibl-fp').default;

const reducer = (state, action) => {
  const {type, payload} = action;
  let newState;
  switch(type) {
    case 'SET':
      newState = payload ? assocDotPath(payload.path, payload.value, state) : state;
      break;
    case 'TRANS':
      newState = payload ? transform(payload, state) : state;
      break;
    default:
      newState =state;
  }
  if( payload && payload.path && payload.path.includes('blinkers') ) {
    console.log('Reducer: old state:', state, '\npayload:', payload, '\nnew state:', newState);
  }
  return newState;
};
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['session', 'color'],
};
const persistedReducer = persistReducer(persistConfig, reducer);


let reduxStore = {}, persistor;

export const initRedux = (initialData) => {
  reduxStore = createStore(
    persistedReducer,
    initialData,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  );
  const persistor = persistStore(reduxStore);
  return {
    reduxStore,
    persistor,
  };
};
const set = (path, value) => {
  reduxStore.dispatch({type: 'SET', payload: {path, value}});
};
const trans = (payload) => {
  reduxStore.dispatch({type: 'TRANS', payload});
};

export default {
  get: (...args) => reduxStore.getState(...args),
  set,
  trans,
}