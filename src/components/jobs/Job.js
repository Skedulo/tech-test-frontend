import React from 'react';

import { formatDate } from '../../utils';

import './Job.css';

export const Jobs = ({ className = '', jobs }) => (
  <ul className={`jobs ${className}`}>
    {jobs.map(job => (
      <Job key={job.id} job={job}></Job>
    ))}
  </ul>
);

export const Job = ({ job }) => {
  const startDate =
    formatDate(job.start).getDayName() +
    ' ' +
    formatDate(job.start).getFullMonth() +
    ' ' +
    formatDate(job.start).getDate() +
    ' ' +
    formatDate(job.start).getFullYear();

  const timeRange = `
    ${formatDate(job.start).getUTCTime()} - ${formatDate(job.end).getUTCTime()}
  `;
  return (
    <li key={job.id} className="job">
      <div className="job__info">
        <div>
          <strong className="job__info__name">{job.name}</strong>
          <span className="job__info__id"> (Job #{job.id})</span>
        </div>
        <span className="job__info__contact">{job.contact.name}</span>
      </div>
      <div className="job__description">
        <div className="job__info__date">
          <div>
            <span>{startDate}</span>
          </div>
          <strong>{timeRange}</strong>
        </div>
      </div>
    </li>
  );
};
