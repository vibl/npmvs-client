import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import {Provider} from 'react-redux';
import {pure} from 'recompose';
import {Redirect, Route, Router } from 'react-router-dom';
import history from '../logic/history';
import './App.css';
import state from '../logic/store';
import ComparisonPage from "./ComparisonPage";
import selection from '../logic/selection';
import HomePage from './HomePage';

// A component must return at least null!
const SelectionChange = pure( ({location}) => {
  selection.update(location.pathname);
  return null;
});

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <Provider store={state.store}>
          <div>
            <Route path="/" component={HomePage}/>
            {/*<div>Top</div>*/}
            {/*<Redirect to="/compare"/>*/}
            {/*<Link to="/compare">Compare packages</Link>*/}
            <Route path="/compare" component={SelectionChange}/>
            <Route path="/compare" component={ComparisonPage}/>
            {/*<Route path="/sample" component={SamplePage}/>*/}
            {/*<Route path="/compare" render={() => <div>a</div>}/>*/}
          </div>
        </Provider>
      </Router>
    );
  }
}

export default hot(module)(App);

