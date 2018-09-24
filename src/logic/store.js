import { createStore } from 'redux';
import stringifier from 'stringifier';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native

const {transform} = require('./vibl-fp').default;

const reducer = (state, {payload}) => {
  const newState = payload ? transform(payload, state) : state;
  if( payload && payload.data && payload.data.CommitsForPeriod ) {
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
function set(payload) {
  reduxStore.dispatch({type: 'SET', payload, debug: stringifier.stringify(payload)});
};

export default {
  get: (...args) => reduxStore.getState(...args),
  set,
}
