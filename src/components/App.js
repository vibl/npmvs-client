import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import {Route, Router } from 'react-router-dom';
import {history} from '../logic/router';
import Store from './Store';
import Head from './layout/Head';
import MainPage from "./layout/MainPage";
import AppStyles from './styles/AppStyles';
import l from '../util/localiz';

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <Store>
          <Head/>
          <AppStyles>
            <MainPage/>
          </AppStyles>
        </Store>
      </Router>
    );
  }
}
export default hot(module)(App);