import React, {useState} from 'react';

import { SectionGroup } from '../components/section/SectionGroup'
import { SectionPanel } from '../components/section/SectionPanel'
import JobsListing from '../components/task1/jobsListing'
import JobInput from '../components/task1/jobInput'

import './QuestionOne.css'

export const QuestionOne = (props) => {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const getJobs = async (obj) => {
    const { data, loading } = await props.service.getJobsWithSearchTerm(obj)
    setJobs(data.jobs)
    setIsLoading(loading)
  }
  // console.log(isLoading)
  return (
    <SectionGroup>
      <SectionPanel>
        <JobInput onInput={obj => getJobs({...obj})} />
        <div className="jobs-listing">
          {
            jobs?.map((job) => {
              return (
                <JobsListing
                  key = {job.id}
                  id = {job.id}
                  jobName = {job.name}
                  startDay = {new Date(job.start).toDateString()}
                  startTime = {new Date(job.start).toLocaleTimeString("en-US")}
                  endDay = {new Date(job.end).toDateString()}
                  endTime = {new Date(job.end).toLocaleTimeString("en-US")}
                  contactAssigned = {job.contact.name}
                >
                </JobsListing>
              )
            })
          }
          {
            isLoading && (<img className="loader" src="icon-loading.svg" alt="loading icon" />)
          }
          
        </div>
      </SectionPanel>
    </SectionGroup>
  )
}