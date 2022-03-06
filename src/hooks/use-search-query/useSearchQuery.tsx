import React, { useCallback, useMemo, useState } from "react"
import { useQuery } from "../use-query/useQuery";

type SearchResultsType = any[]
type SearchResultsResponse = Promise<SearchResultsType>
type ChangeEventType = React.ChangeEvent<HTMLInputElement>

interface SearchQueryProps {
  fetchQuery: (searchTerm: string) => SearchResultsResponse,
  minimumCharacterLength?: number
}

export interface SearchQueryOutput {
  errorMessage: string,
  isLoading: boolean,
  searchResults: SearchResultsType,
  searchTerm: string,
  onClear: () => void,
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => SearchResultsResponse,
  showNoResultsMessage: boolean
}

const DEFAULT_MINIMUM_CHARACTER_LENGTH = 3;

export const useSearchQuery = (props: SearchQueryProps): SearchQueryOutput => {
  const { fetchQuery, minimumCharacterLength = DEFAULT_MINIMUM_CHARACTER_LENGTH } = props
  const {
    data: searchResults,
    errorMessage,
    fetchData,
    hasNoData: hasNoSearchResults,
    isLoading,
    setData: setSearchResults,
    setErrorMessage
  } = useQuery({ fetchQuery })

  const [searchTerm, setSearchTerm] = useState('')
  const [isValidLength, setIsValidLength] = useState(false)

  const showNoResultsMessage = useMemo(
    () => hasNoSearchResults && isValidLength,
    [hasNoSearchResults, isValidLength]
  )

  const onInputChange = useCallback((event: ChangeEventType): Promise<void | any> => {
    const term = event.target.value; // Use event.target.value because setState doesn't get the most updated value onChange
    setSearchTerm(term)

    const isValid = term.length >= minimumCharacterLength;
    setIsValidLength(isValid);

    if (!isValid) {
      setSearchResults(null);
      return Promise.resolve()
    }
    return fetchData(term)
  }, [fetchData, minimumCharacterLength, setSearchResults])

  const onClear = useCallback(() => {
    setErrorMessage(null)
    setSearchTerm('')
    setSearchResults(null)
  }, [setErrorMessage, setSearchTerm, setSearchResults])

  return {
    errorMessage,
    isLoading,
    onClear,
    onInputChange,
    searchResults,
    searchTerm,
    showNoResultsMessage
  } as SearchQueryOutput
}