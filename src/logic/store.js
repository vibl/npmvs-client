import { createStore } from 'redux';
import stringifier from 'stringifier';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native

const {transform} = require('./vibl-fp').default;

const reducer = (state, {payload}) => payload ? transform(payload, state) : state;

const persistConfig = {
  key: 'root',
  storage,
};
const persistedReducer = persistReducer(persistConfig, reducer);


let reduxStore = {};

export const initRedux = (initialData) => {
  reduxStore = createStore(
    persistedReducer,
    initialData,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  );
  return reduxStore;
};
export const persistor = persistStore(store);

function set(payload) {
  reduxStore.dispatch({type: 'SET', payload, debug: stringifier.stringify(payload)});
};

export default {
  get: (...args) => reduxStore.getState(...args),
  set,
}
