import React from 'react'
export default ({ id, jobName, startDay, startTime, endDay, endTime, contactAssigned }) => {
  return (
    <div className="jobs-listing__item">
      <div className="jobs-listing__item--header">
        <h3 className="jobs-listing__item--title">{jobName}</h3>
        <span className="jobs-listing__item--number">(Job #{id})</span>
      </div>
      <div className="jobs-listing__item--body">
        <p className="jobs-listing__item--assigned">{contactAssigned}</p>
        <div className="row">
          <div className="col">
            <p className="text-bold text-smaller text-uppercase">Job Start</p>
            <p className="jobs-listing__item--start">{startDay}</p>
            <p className="jobs-listing__item--start">{startTime}</p>
          </div>
          <div className="col">
            <p className="text-bold text-smaller text-uppercase">Job End</p>
            <p className="jobs-listing__item--end">{endDay}</p>
            <p className="jobs-listing__item--end">{endTime}</p>
          </div>
        </div>
      </div>
    </div>
  )
}