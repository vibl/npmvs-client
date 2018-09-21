import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import {Provider} from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import {Route, Router } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import {history} from '../logic/router-utils';
import {initRedux} from '../logic/store';
import MainPage from "./MainPage";
import Blinker from './generic/Blinker';
import theme from './styles/theme';
import initialState from '../logic/initial-state';
import AppStyles from './styles/AppStyles';

const {reduxStore, persistor} = initRedux(initialState);

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <Provider store={reduxStore}>
          <PersistGate loading={null} persistor={persistor}>
          <MuiThemeProvider theme={createMuiTheme(theme)}>
          <Blinker>
            <AppStyles>
              <Route path="/" component={MainPage}/>
            </AppStyles>
          </Blinker>
          </MuiThemeProvider>
          </PersistGate>
        </Provider>
      </Router>
    );
  }
}
export default hot(module)(App);

