import React from 'react'
import PropTypes from 'prop-types'

import useLoadJobs from '../hooks/useLoadJobs'

import JobItem from './JobItem'

const JobList = ({ searchString$, service }) => {
  const { jobs, isLoading, isInitial } = useLoadJobs(searchString$, service.getJobsWithSearchTerm)

  if (isInitial) {
    return null
  }

  if (isLoading) {
    return 'loading'
  }

  if (!jobs.length) {
    return 'Not Found'
  }

  return (
    <React.Fragment>
      {jobs.map((item) => <JobItem key={item.id} item={item} />)}
    </React.Fragment>
  )
}

JobList.propTypes = {
  searchString$: PropTypes.object.isRequired,
  service: PropTypes.shape({
    getJobsWithSearchTerm: PropTypes.func.isRequired
  }).isRequired
}

export default JobList