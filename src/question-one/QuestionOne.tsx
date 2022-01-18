import React, { useEffect, useState } from "react"
import { IAppTabContainer } from "../common/types"

import { SectionGroup } from "../components/section/SectionGroup"
import { SectionPanel } from "../components/section/SectionPanel"
import { SearchBox } from "../components/search-box/SearchBox"
import { JobGrid } from "../components/jobs/JobGrid"
import { Loader } from "../components/loader/Loader"

import "./QuestionOne.css"

import debounce from 'lodash/debounce'
import isEmpty from 'lodash/isEmpty'
import useJobs from "../hooks/useJobs"

export const QuestionOne = ({ service }: IAppTabContainer) => {
  const [searchText, setSearchText] = useState('');
  const { isLoading, jobs, getJobsWithSearchTerm } = useJobs({ name: '' }, service);
  
  useEffect(() => {
    if (!isEmpty(searchText) && searchText.trim().length >= 3) {
      getJobsWithSearchTerm(searchText);
    }
  }, [searchText])

  const onSearchTextChange = debounce(setSearchText, 500)

  return (
    <SectionGroup>
      <SectionPanel>
        <h2>Jobs</h2>
        <Loader visible={isLoading} />
        <SearchBox onChange={onSearchTextChange} placeholder="Enter Job here..." />
        <JobGrid data={jobs} />
      </SectionPanel>
    </SectionGroup>
  )
}
