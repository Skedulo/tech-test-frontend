import React, { useState, useCallback } from 'react';

import { SectionGroup } from '../components/section/SectionGroup'
import { SectionPanel } from '../components/section/SectionPanel'

import JobList from './JobList';
import './QuestionOne.css'

const Loader = () => <div className="loader">Loading...</div>

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
          <Loader/> : <JobList jobs={jobs} /> }
      </SectionPanel>
    </SectionGroup>
  )
}