import React from 'react'
export default ({ id, jobName, startDay, startTime, endDay, endTime, contactAssigned, numberResourceAllocated }) => {
  return (
    <div className="left-pane__item">
      <div className="left-pane__item--header">
        <h3 className="left-pane__item--title">{jobName}</h3>
        <span className="left-pane__item--number">(Job #{id})</span>
      </div>
      <div className="left-pane__item--body">
        <p className="left-pane__item--assigned">{contactAssigned}</p>
        <p className="left-pane__item--date">{startDay.toDateString() + (new Date(endDay).setHours(0,0,0,0) > new Date(startDay).setHours(0,0,0,0) ? ' - ' + endDay.toDateString() : '')}</p>
        <p className="left-pane__item--time">{startTime + ' - ' + endTime}</p>
        <div className="left-pane__item--allocated">
          <span>{numberResourceAllocated}</span>
        </div>
      </div>
    </div>
  )
}