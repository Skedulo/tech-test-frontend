import React, { useState, useEffect } from 'react';

import { SectionGroup } from '../components/section/SectionGroup'
import { SectionPanel } from '../components/section/SectionPanel'

import './QuestionThree.css';

function formateMinute(min) {
    if (min > 9) {
        return min;
    } else {
        return '0' + min;
    }
}

export const QuestionThree = (props) => {
    const [loading, setLoading] = useState(true);
    const [jobs, setJobs] = useState([]);

    useEffect(() => {

        function loadData() {
            let promises = [];
            promises.push(props.service.getJobs());
            promises.push(props.service.getJobAllocations());

            Promise.all(promises).then((responses) => {
                let [jobs, job_allocations] = responses;
                setJobs(
                    jobs.map(job => {
                        let number_allocations = job_allocations.filter(job_allocation => {
                            return job_allocation.jobId == job.id
                        });
                        job.number_allocations = number_allocations.length;
                        return job;
                    })
                );

                setLoading(false);
            });
        }

        loadData();
    }, []);

    let job_lists = [];

    jobs.map((job) => {
        job_lists.push((
            <div key={job.id} className="q3-job-block">
                <div><span className="q3-job-name">{job.name}</span> (Job #{job.id})</div>
                <div>{job.location}</div>
                <div className="q3-job-datetime">
                    <div>{new Date(job.start).toDateString()}</div>
                    <div className="q3-job-time">{new Date(job.start).getHours()}:{formateMinute(new Date(job.start).getMinutes())} - {new Date(job.end).getHours()}:{formateMinute(new Date(job.end).getMinutes())}</div>
                </div>
                {job.number_allocations > 0 && <div className="q3-job-allocations">{job.number_allocations}</div>}
            </div>
        ));
    });

    let right_blocks = [];
    for(let i = 0; i<20; i++) {
        right_blocks.push(<div className="q3-right-block" key={i}></div>);
    }

    return (
        <SectionGroup>
            <SectionPanel>
                <div className="q3-header">Header</div>
                <div className="q3-container">
                    <div className="q3-job-menu">
                        {job_lists}
                    </div>
                    <div className="q3-job-details">{right_blocks}</div>
                </div>
            </SectionPanel>
        </SectionGroup>
    )
}