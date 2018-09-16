import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import {Provider} from 'react-redux';
import {pure} from 'recompose';
import {Route, Router } from 'react-router-dom';
import styled from "react-emotion";
import history from '../logic/history';
import {initRedux} from '../logic/store';
import selection from '../logic/selection';
import ComparisonPage from "./ComparisonPage";
import Blinker from './generic/Blinker';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#880022',
    }
  }
});
const initialData = {
  packages: {},
  charts: {},
  selection: [],
  focus: undefined,
  color: {
    hues: [0, 120, 240, 60, 330, 180, 90, 270, 30, 150, 300, 210],
    hue: 70,
    saturation: 40,
    lightness: 70,
  },
  session: {
    needsHelp: true,
  },
};

// A component must return at least null!
const SelectionChange = pure( ({location}) => {
  selection.update(location.pathname);
  return null;
});
const AppStyles = styled.div`
  background-color: #f7f1f1;
  font-family: Roboto;
`;
class App extends Component {
  render() {
    return (
      <Router history={history}>
        <Provider store={initRedux(initialData)}>
          <MuiThemeProvider theme={theme}>
          <Blinker>
            <AppStyles>
              {/*<Route exact path="/" component={HomePage}/>*/}
              {/*<div>Top</div>*/}
              {/*<Redirect to="/compare"/>*/}
              {/*<Link to="/compare">Compare packages</Link>*/}
              <Route path="/" component={SelectionChange}/>
              <Route path="/" component={ComparisonPage}/>
              {/*<Route path="/sample" component={SamplePage}/>*/}
              {/*<Route path="/compare" render={() => <div>a</div>}/>*/}
            </AppStyles>
          </Blinker>
          </MuiThemeProvider>
        </Provider>
      </Router>
    );
  }
}

export default hot(module)(App);

