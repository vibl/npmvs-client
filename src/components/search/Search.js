import React, { Component } from 'react';
import {Configure, InstantSearch, connectRefinementList} from 'react-instantsearch-dom';
import {clamp} from 'ramda';
import SearchBox from './SearchBox';
import Results from './Results';
import secrets from '../../data/secrets';
import setNativeValue from "../util/setNativeValue";
import {registerPopup, displayPopup, hidePopupAfterTimeout} from '../util/popup-display-hide';
import {selectPackage} from '../../logic/router';


const hitsPerPage = 20;
const choiceKeys = {
  13: 0,
  38: -1,
  40: +1,
};
const {appId, apiKey, indexName} = secrets.algolia;
const equals = (arr1, arr2) =>
  arr1.length === arr2.length && arr1.reduce((a, b, i) => a && arr2[i], true);

const shouldFocus = path =>
  path.includes('/packages') ||
  path.replace(/\/[a-zA-Z-]+\/?/, '').length === 0;

class Search extends Component {
  wrapperRef = React.createRef();
  cursor = -1;

  handleSearchBoxMouseEnter = () =>
    displayPopup('SearchResults');

  handleMouseLeave = () =>
    hidePopupAfterTimeout('SearchResults', 110);

  setInputValue = (value, dispatchEvent = false) => {
    if( ! this.wrapperRef.current ) return;
    const inputEl = this.wrapperRef.current.querySelector('input[type="search"]');
    if( ! inputEl ) throw new Error('No input element was found.');
    if( typeof value === 'function' ) {
      const fn = value;
      value = fn(inputEl.value);
    }
    setNativeValue(inputEl, value);

    if( dispatchEvent ) {
      inputEl.dispatchEvent(new Event('input', { bubbles: true }));
    }
  };

  handleKeyUp = (event) => {
    const keyCode = event.keyCode;
    const offset = choiceKeys[keyCode];
    if( ! offset ) return;
    if( ! this.wrapperRef.current ) return;
    const resultsContainerEl = this.wrapperRef.current.querySelector('table.results > tbody');
    const results = resultsContainerEl.children;
    const count = results.length;
    if( count === 0) return;
    let cursor = clamp(0, count - 1, this.cursor + offset);
    const current = results[this.cursor];
    if(current) current.classList.remove('hover');
    results[cursor].classList.add('hover');
    this.cursor = cursor;
    // Setting SearchBox value without triggering events.
    const packName = results[cursor].querySelector('td.name > span:first-child').textContent;
    this.setInputValue(packName, false);
    event.preventDefault();
  };
  handleSubmit = (event) => {
    event.preventDefault();
    const packNameSelector = 'table.results > tbody > tr.hit.hover > td.name > span:first-child';
    const packNameEl = this.wrapperRef.current.querySelector(packNameSelector);
    if( ! packNameEl ) return;
    const packName = packNameEl.textContent;
    selectPackage(packName);

  };
  handleSearchStateChange = () => {
    this.cursor = -1;
  };
  componentDidMount() {
    registerPopup('SearchResults');
  }

  render() {
    return (
      <div
        ref={this.wrapperRef}
        onMouseEnter={this.handleSearchBoxMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        onKeyUp={this.handleKeyUp}
      >
        <InstantSearch
          {...{appId, apiKey, indexName}}
          onSearchStateChange={this.handleSearchStateChange}
        >
          <Configure
            hitsPerPage={hitsPerPage}
            facets={['keywords']}
            attributesToRetrieve={[
              'name',
              'description',
              'keywords',
              'repository',
              'owner',
              'downloadsLast30Days',
            ]}
            attributesToHighlight={['name', 'description', 'keywords']}
          />
            <SearchBox
              autoFocus={shouldFocus(window.location.pathname)}
              translations={{
                placeholder: l`Search NPM packages<>Rechercher des modules NPM`,
              }}
              onSubmit={this.handleSubmit}
            />
          <Results
            setInputValue={this.setInputValue}
          />
        </InstantSearch>
      </div>
    );
  }
}
// export default withUrlSync(Search);
export default Search;
