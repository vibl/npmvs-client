import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import {Provider} from 'react-redux';
import {pure} from 'recompose';
import {Route, Router } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import {history} from '../logic/router-utils';
import {initRedux} from '../logic/store';
import {updateSelection} from '../logic/selection';
import ComparisonPage from "./ComparisonPage";
import Blinker from './generic/Blinker';
import theme from './styles/theme';
import initialState from './initial-state';
import AppStyles from './styles/AppStyles';

const SelectionChange = pure( ({location}) => {
  updateSelection(location.pathname);
  return null;
});
class App extends Component {
  render() {
    return (
      <Router history={history}>
        <Provider store={initRedux(initialState)}>
          <MuiThemeProvider theme={createMuiTheme(theme)}>
          <Blinker>
            <AppStyles>
              <Route path="/" component={SelectionChange}/>
              <Route path="/" component={ComparisonPage}/>
            </AppStyles>
          </Blinker>
          </MuiThemeProvider>
        </Provider>
      </Router>
    );
  }
}
export default hot(module)(App);

