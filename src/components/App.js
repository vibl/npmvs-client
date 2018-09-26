import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import {Provider} from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import {Route, Router } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import {history} from '../logic/router';
import {initRedux} from '../data/store';
import Head from './layout/Head';
import MainPage from "./layout/MainPage";
import Blinker from './util/Blinker';
import theme from './styles/theme';
import initialState from '../data/initial-state';
import AppStyles from './styles/AppStyles';

const {reduxStore, persistor} = initRedux(initialState);

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <Provider store={reduxStore}>
          <div>
          <PersistGate loading={null} persistor={persistor}>
            <Head/>
            <MuiThemeProvider theme={createMuiTheme(theme)}>
            <Blinker>
              <AppStyles>
                <Route path="/" component={MainPage}/>
              </AppStyles>
            </Blinker>
            </MuiThemeProvider>
          </PersistGate>
          </div>
        </Provider>
      </Router>
    );
  }
}

export default hot(module)(App);

