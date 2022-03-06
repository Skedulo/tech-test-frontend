import React from "react"
import "./JobCard.css"
import { Job } from "../../common/types"
import { formatDate, formatTime } from "../../common/formatDateTime";

interface IJobItem {
  job: Job,
}

export const JobCard: React.FC<IJobItem> = (props: IJobItem) => {
  const { job } = props;
  return (
    <div className="question-three__job-card" key={job.id}>
      <div className="question-three__job-name">
        {job.name} <span className="question-three__job-id question-three__secondary-text">(Job #{job.id})</span>
      </div>
      <div className="question-three__job-location question-three__secondary-text">
        {job.location}
      </div>
      <div className="question-three__job-date question-three__secondary-text">
        {formatDate(job.start)}
      </div>
      <div className="question-three__job-date-time question-three__secondary-text">
        {formatTime(job.start)} - {formatTime(job.end)}
      </div>
    </div>
  )
}

