import React from 'react'
import PropTypes from 'prop-types'

import './JobCard.css'
const formatTime = (date) => `${date.getUTCHours().toString().padStart(2, '0')}:${date.getUTCMinutes().toString().padStart(2, '0')}`

const JobCard = ({ job: { name, location, id, start, end, jobAllocations } }) => {
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

JobCard.propTypes = {
  job: PropTypes.shape({
    name: PropTypes.string,
    location: PropTypes.string,
    id: PropTypes.string,
    start: PropTypes.instanceOf(Date),
    end: PropTypes.instanceOf(Date),
    jobAllocations: PropTypes.array
  })
}

export default JobCard
