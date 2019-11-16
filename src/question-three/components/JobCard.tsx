import React from 'react'
import { Job } from '../../types/Job'

import './JobCard.css'
const formatTime = (date: Date) => `${date.getUTCHours().toString().padStart(2, '0')}:${date.getUTCMinutes().toString().padStart(2, '0')}`

const JobCard: React.FC<{job: Job}> = ({ job: {start, end, name, id, location, jobAllocations = []} }) => {
  const startDate = new Date(start)
  const endDate = new Date(end)
  return (
    <div className="jobCard">
      <div className="jobCard__title">
        <strong className="jobCard__title__name">{name}</strong>
        <span className="jobCard__title__id"> (Job #{id})</span>
      </div>
      <div className="jobCard__location">{location}</div>
      <div className="jobCard__datetime">
        <div className="jobCard__datetime__date">{startDate.toDateString()}</div>
        <div className="jobCard__datetime__time">
          {formatTime(startDate)}-{formatTime(endDate)}
        </div>
      </div>
      <div className={`jobCard__allocationCounter ${!jobAllocations.length ? 'jobCard__allocationCounter--hidden' : ''}`}>
        {jobAllocations.length}
      </div>
    </div>
  )
}

export default JobCard
