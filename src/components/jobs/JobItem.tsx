import React from "react"
import { Contact, Job } from "../../common/types";
import moment from 'moment';

export interface JobItemProps {
    item: Pick<Job, 'name' | 'start' | 'end'> & { contact: Contact }
}

export function JobItem({ item }: JobItemProps) {
    const { name, contact, start, end } = item;

    const dateTimeTemplate = () => {
        const startTime = moment(start);
        const endTime = moment(end);
        return (
            <div className="job__job-time">
                <div data-testid="datetime-from" className="job__job-time__value">
                    <div className="bold-600">From</div>
                    <div>{startTime.format('ddd MMM DD YYYY hh:mm A')}</div>
                </div>
                <div data-testid="datetime-to" className="job__job-time__value">
                    <div className="bold-600">To</div>
                    <div>{endTime.format('ddd MMM DD YYYY hh:mm A')}</div>
                </div>
            </div>
        )
    }

    return (
        <div className='job flex-columns-2'>
            <div data-testid='job-name' className="text-x25">
                {name}
            </div>
            <br />
            {dateTimeTemplate()}
            <br />
            <div data-testid='contact'><span className="bold-600">Contact: </span>{contact.name}</div>
        </div>
    );
}