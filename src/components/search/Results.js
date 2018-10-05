import React from 'react';
import {connect} from 'react-redux';
import {Pagination, CurrentRefinements, Stats, connectHits, createConnector} from 'react-instantsearch-dom';
import Hit from './Hit';
import { isEmpty } from './util';
import {StyledContainer, NoResults} from './results-styles';

const Hits = connectHits(({ hits, setInputValue}) => {
  return hits && (
    <table className="results">
      <tbody>
      { hits.map(
        hit => (
          <Hit
            key={hit.objectID}
            {...{hit, setInputValue}}
          />
        ))}
      </tbody>
    </table>
  )
});

const ResultsFound = ({ pagination, setInputValue}) => (
  <StyledContainer
    className="results container"
  >
    <Hits {...{setInputValue}} />
  </StyledContainer>
);
const connectResults = createConnector({
  displayName: 'ConnectResults',
  refine(props, searchState, keyword,) {
    return {
      ...searchState,
      query: searchState.query + ' ' + keyword,
    }
  },
  getProvidedProps(props, searchState, searchResults) {
    const noResults = searchResults.results
      ? searchResults.results.nbHits === 0
      : false;
    return { searchState, noResults};
  },
});
const Results = connectResults(
  ({ noResults, searchState, refine: handleKeywordClick, setInputValue, visible}) =>
    ! visible || isEmpty(searchState.query)
      ? null
      : noResults
        ? <NoResults>
            <p>{l`No results<>Pas de résultats`}</p>
          </NoResults>
        : <ResultsFound
            {...{setInputValue}}
          />
);
const mapStateToProps = (state) => ({
  visible: state.ui.displayHide && state.ui.displayHide.SearchResults && state.ui.displayHide.SearchResults.visible,
});
export default connect(mapStateToProps)(Results);
