import React, { useState, useEffect } from 'react'

import JobCard from './JobCard'
import { from } from 'rxjs'

import './JobList.css'
import { IJobService } from '../../service/DataService'
import { Job } from '../../types/Job'

interface State {
  jobs : Job[],
  isLoading: Boolean
}

const INITIAL_STATE = {
  jobs: [],
  isLoading: true
}

const useLoadJobs = (searchFn: IJobService["getJobsWithSearchTerm"]) => {
  const [state, updateState] = useState<State>(INITIAL_STATE)

  useEffect(() => {
    const subscription = from(searchFn())
      .subscribe((jobs) => {
        updateState({
          jobs,
          isLoading: false
      })
      })

    return () => {
      subscription.unsubscribe()
    }
  }, [searchFn])

  return state
}

const JobList : React.FC<{service: IJobService, className: string}> = ({ service, className }) => {
  const { jobs, isLoading } = useLoadJobs(service.getJobsWithSearchTerm)

  return (
    <div className={`jobList ${className}`}>
      {isLoading ? 'Loading' : jobs.map(job => (
        <JobCard job={job} key={job.id} />
      ))}
    </div>
  )
}


export default JobList
