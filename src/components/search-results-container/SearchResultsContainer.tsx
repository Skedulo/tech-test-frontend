import React from 'react';
import { QueryDataDisplay } from '../query-data-display/QueryDataDisplay';

interface ISearchResultsContainer {
  children: React.ReactNode,
  errorMessage?: string,
  isLoading: boolean,
  showNoResultsMessage: boolean
}

export const SearchResultsContainer: React.FC<ISearchResultsContainer> = (props: ISearchResultsContainer) => {
  const { children, errorMessage, isLoading, showNoResultsMessage } = props
  return (
    <>
      {showNoResultsMessage && (
        <div data-testid="no-search-results">There were no search results found.  Please try a different search term.</div>
      )}
      <QueryDataDisplay {...{ isLoading, errorMessage }}>{children}</QueryDataDisplay>
    </>
  )
}
