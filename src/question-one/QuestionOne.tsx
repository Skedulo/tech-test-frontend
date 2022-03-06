import React, { useCallback } from "react"
import { IAppTabContainer, JobSearchFields } from "../common/types"
import { useSearchQuery } from "../hooks/use-search-query/useSearchQuery"
import { JobSearchList } from "./job-search-list/JobSearchList"
import { SearchField } from "../components/search-field/SearchField"
import { SearchResultsContainer } from "../components/search-results-container/SearchResultsContainer"
import { Spacer } from "../components/spacer/Spacer"

import { SectionGroup } from "../components/section/SectionGroup"
import { SectionPanel } from "../components/section/SectionPanel"

export interface JobSearchQueryType {
  isLoading: boolean,
  errorMessage: string,
  searchResults: JobSearchFields[],
  searchTerm: string,
  onClear: () => void,
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => Promise<any>,
  showNoResultsMessage: boolean
}

export const QuestionOne: React.FC<IAppTabContainer> = (props: IAppTabContainer) => {
  const { service } = props

  const getJobs = useCallback(
    (searchTerm) => service.getJobsWithSearchTerm(searchTerm),
    [service]
  )

  const searchQuery: JobSearchQueryType = useSearchQuery({ fetchQuery: getJobs })

  const {
    searchTerm,
    onClear,
    onInputChange,
    searchResults,
    ...searchListParams
  } = searchQuery

  return (
    <SectionGroup>
      <SectionPanel>
        <SearchField id="searchJobs" name="searchJobs" label="Search Jobs" {...{ searchTerm, onClear, onInputChange }} />
        <Spacer />
        <SearchResultsContainer {...searchListParams}>
          <JobSearchList searchResults={searchResults} />
        </SearchResultsContainer>
      </SectionPanel>
    </SectionGroup>
  )
}
