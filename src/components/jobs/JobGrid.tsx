import React from "react"
import { JobItem } from "./JobItem"
import { Contact, Job } from "../../common/types"

export interface JobGridProps {
    data: (Pick<Job, 'name' | 'start' | 'end'> & { contact: Contact })[]
}

export function JobGrid({ data = [] }: JobGridProps) {

    let index = 0;
    return (
        <div className="job-result">
            <div data-testid="job-count" className="job-result__job-count">{data.length} job(s) found</div>
            <div data-testid="job-list" className="job-list">
                {data.map((job) => {
                    index++;
                    return <JobItem key={index} item={job} />
                })}
            </div>
        </div>
    )
}
