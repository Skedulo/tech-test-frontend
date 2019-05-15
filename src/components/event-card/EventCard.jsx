import React from 'react';
import moment from 'moment';
import cn from 'classnames';
import './styles.css';

const DATE_FORMAT = 'MMMM Do YYYY, h:mm:ss a';

export default React.memo(props => {
    const { resource, title, contact, type } = props;
    const startTime = moment(props.start_time).format(DATE_FORMAT);
    const endTime = moment(props.end_time).format(DATE_FORMAT);
    const classNames = cn('event-card__container', type);
    return (
        <div className={classNames}>
            <p className="event-card__title"><span>{type}</span>{title}</p>
            <p className="event-card__resource"><span>Resource</span>{resource.title}</p>
            <p className="event-card__start-time"><span>Start Time</span>{startTime}</p>
            <p className="event-card__end-time"><span>End Time</span>{endTime}</p>
            {contact && <p className="event-card__contact-name"><span>Contact</span>{contact.name}</p>}
        </div>
    );
});
