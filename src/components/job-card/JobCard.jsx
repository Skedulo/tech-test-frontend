import React from 'react';
import './styles.css';
import moment from 'moment'
import 'moment-timezone';

export const DATE_FORMAT = 'MMMM Do YYYY, h:mm:ss a';

export default React.memo(props => {
    const { name, start, end, contact } = props;
    const startTime = moment(start).format(DATE_FORMAT);
    const endTime = moment(end).format(DATE_FORMAT);

    return (
        <div className="job-card__container">
            <p className="job-card__name"><span>Job</span>{name}</p>
            <p className="job-card__start-time"><span>Start Time</span>{startTime}</p>
            <p className="job-card__end-time"><span>End Time</span>{endTime}</p>
            <p className="job-card__contact-name"><span>Contact</span>{contact.name}</p>
        </div>
    );
});
