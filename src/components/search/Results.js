import React from 'react';
import {
  Pagination,
  CurrentRefinements,
  Stats,
  connectHits,
  createConnector,
} from 'react-instantsearch-dom';
import Hit from './Hit';
import { isEmpty } from './util';
import {StyledContainer, NoResults} from './results-styles';

const body = document.querySelector('body');

const Hits = connectHits(({ hits, handleKeywordClick}) => {
  return hits && (
    <table className="results">
      <tbody>
      { hits.map(
        hit => (
          <Hit
            key={hit.objectID}
            {...{hit, handleKeywordClick}}
          />
        ))}
      </tbody>
    </table>
  )
});
const ResultsFound = ({ pagination, handleKeywordClick}) => (
  <StyledContainer className="results container">
    <Hits {...{handleKeywordClick}} />
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
    const handleKeywordClick = (keyword) => {
      console.log(searchState.query, keyword);
    };

    const noResults = searchResults.results
      ? searchResults.results.nbHits === 0
      : false;
    return { searchState, noResults, handleKeywordClick };
  },
});

const Results = connectResults(
  ({ noResults, searchState, refine: handleKeywordClick }) =>
    isEmpty(searchState.query)
      ? null
      : noResults
        ? <NoResults>
            <p>{l`No results<>Pas de résultats`}</p>
          </NoResults>
        : <ResultsFound
            {...{handleKeywordClick}}
          />
);

export default Results;
