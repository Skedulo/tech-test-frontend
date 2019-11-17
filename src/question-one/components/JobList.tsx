import React from 'react'

import useLoadJobs from '../hooks/useLoadJobs'

import JobItem from './JobItem'
import { Subscribable, ObservableInput } from 'rxjs'
import {Job} from '../../types/Job'

type JobListProps =  {
  searchString$: Subscribable<string>,
  service: {
    getJobsWithSearchTerm: () => ObservableInput<Job[]>
  }
}

const JobList: React.FC<JobListProps> = ({ searchString$, service }) => {
  const { jobs, isLoading, isInitial } = useLoadJobs(searchString$, service.getJobsWithSearchTerm)
  let content

  if (isInitial) {
    content = null
  } else if (isLoading) {
    content = <>loading</>
  } else if (!jobs.length) {
    content = <>Not Found</>
  } else {
    content = (
      <>
        {jobs.map((item) => <JobItem key={item.id} item={item} />)}
      </>
    )
  }

  return (
    <div title="Job List">
      {content}
    </div>
  )
}

export default JobList
