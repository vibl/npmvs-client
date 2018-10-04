import React, { Component } from 'react';
import {
  Configure,
  InstantSearch,
  connectRefinementList,
} from 'react-instantsearch-dom';

import SearchBox from './SearchBox';
import Results from './Results';
import { algolia } from './config';

const equals = (arr1, arr2) =>
  arr1.length === arr2.length && arr1.reduce((a, b, i) => a && arr2[i], true);

// package overview page
// home page (/:lang/)
const shouldFocus = path =>
  path.includes('/packages') ||
  path.replace(/\/[a-zA-Z\-]+\/?/, '').length === 0;

class Search extends Component {
  render() {
    const {searchState, onSearchStateChange} = this.props;

    return (
      <InstantSearch
        appId={algolia.appId}
        apiKey={algolia.apiKey}
        indexName={algolia.indexName}
        searchState={searchState}
        onSearchStateChange={onSearchStateChange}
      >
        <Configure
          hitsPerPage={12}
          facets={['keywords']}
          attributesToRetrieve={[
            'name',
            'description',
            'keywords',
            'owner',
            'repository',
            'homepage',
            'downloadsLast30Days',
          ]}
          attributesToHighlight={['name', 'description', 'keywords']}
        />
        <SearchBox
          autoFocus={shouldFocus(window.location.pathname)}
          translations={{
            placeholder: l`Search NPM packages here<>Rechercher les modules NPM ici`,
          }}
        />
        <Results/>
      </InstantSearch>
    );
  }
}

// export default withUrlSync(Search);
export default Search;
