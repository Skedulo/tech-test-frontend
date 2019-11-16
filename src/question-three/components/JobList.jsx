import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import JobCard from './JobCard'
import { from } from 'rxjs'

import './JobList.css'

const INITIAL_STATE = {
  jobs: [],
  isLoading: true
}

const useLoadJobs = (searchFn) => {
  const [state, updateState] = useState(INITIAL_STATE)

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

const JobList = ({ service, className }) => {
  const { jobs, isLoading } = useLoadJobs(service.getJobsWithSearchTerm)

  return (
    <div className={`jobList ${className}`}>
      {isLoading ? 'Loading' : jobs.map(job => (
        <JobCard job={job} key={job.id} />
      ))}
    </div>
  )
}

JobList.propTypes = {
  service: PropTypes.shape({
    getJobsWithSearchTerm: PropTypes.func.isRequired
  }),
  className: PropTypes.string
}

export default JobList
