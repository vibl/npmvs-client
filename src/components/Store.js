import React from 'react';
import {Provider} from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import {initRedux} from '../data/store';
import initialState from '../data/initial-state';

const {reduxStore, persistor} = initRedux(initialState);

const Store = ({children}) =>  (
  <Provider store={reduxStore}>
    <PersistGate loading={null} persistor={persistor}>
      {children}
    </PersistGate>
  </Provider>
);
export default Store;