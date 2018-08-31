import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import {Provider} from 'react-redux';
import {pure} from 'recompose';
import {Redirect, Route, Router } from 'react-router-dom';
import history from '../logic/history';
import './App.css';
import {store} from '../logic/store';
import ComparisonPage from "./ComparisonPage";
import {updateSelectionFromLocation} from '../logic/table-data';
import {pipe} from 'ramda';

// A component must return at least null!
const SelectionChange = pure(pipe(updateSelectionFromLocation, ()=>null));

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <Provider store={store}>
          <div>
            {/*<div>Top</div>*/}
            {/*<Redirect to="/compare"/>*/}
            {/*<Link to="/compare">Compare packages</Link>*/}
            <Route path="/compare" component={SelectionChange}/>
            <Route path="/compare" component={ComparisonPage}/>
            {/*<Route exact path="/compare" render={() => <div>a</div>}/>*/}
            {/*<ComparisonPage/>*/}
          </div>
        </Provider>
      </Router>
    );
  }
}

export default hot(module)(App);

