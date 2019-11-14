import React from 'react';

import useLoadJobs from '../hooks/useLoadJobs';

import JobItem from './JobItem'

export default ({searchString$, service}) => {
  const {jobs, isLoading, isInitial} = useLoadJobs(searchString$, service.getJobsWithSearchTerm)

  if (isInitial) {
    return null;
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