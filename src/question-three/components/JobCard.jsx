import React from "react";
import "./JobCard.css";
const formatTime = (date) => `${date.getUTCHours().toString().padStart(2, '0')}:${date.getUTCMinutes().toString().padStart(2, '0')}`

export default ({ job: { name, location, id, start, end, jobAllocations } }) => {
    let startDate = new Date(start);
    let endDate = new Date(end);
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
    );
};
