import React, { useState, useCallback, useEffect } from 'react';
import Loader from "react-loader-spinner";

import { SectionGroup } from '../components/section/SectionGroup'
import { SectionPanel } from '../components/section/SectionPanel'

import JobList from './JobList';
import './QuestionOne.css'

export const QuestionOne = ({ service }) => {
  const [searchedText, setSearchedText] = useState('');
  const [isLoadingJobList, setIsLoadingJobList] = useState(false);
  const [jobs, setJobs] = useState([]);

  const onSearchedTextChange = useCallback((event) => {
    const updatedSearchedText = event.target.value || '';
    if(updatedSearchedText.length >= 3) {
      setIsLoadingJobList(true);
      service.getJobsWithSearchTerm(updatedSearchedText)
        .then(result => {
          setJobs(result);
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => setIsLoadingJobList(false))
    }
    setSearchedText(updatedSearchedText);
  });

  return (
    <SectionGroup>
      <SectionPanel>
        <input value={searchedText} onChange={onSearchedTextChange}/>
        { isLoadingJobList ? 
          <Loader
            type="Puff"
            color="#00BFFF"
            height={100}
            width={100}
          /> : <JobList jobs={jobs} /> }
      </SectionPanel>
    </SectionGroup>
  )
}