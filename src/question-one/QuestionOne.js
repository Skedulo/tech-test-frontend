import React, { useState, useEffect } from 'react';

import { SectionGroup } from '../components/section/SectionGroup'
import { SectionPanel } from '../components/section/SectionPanel'

import './QuestionOne.css'

export const QuestionOne = (props) => {
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);
    const [jobs, setJobs] = useState([]);
    const [contacts, setContacts] = useState([]);

    const onChange = (e) => {
        if (e.target.value.length > 3 || e.target.value.length === 0) {
            setLoading(true);
            setSearch(e.target.value);
        }
    }

    useEffect(() => {
        function loadData() {
            let promises = [];
            if (contacts.length === 0) {
                promises.push(props.service.getContacts())
            }

            if (search) {
                promises.push(props.service.getJobsWithSearchTerm(search))
                Promise.all(promises).then((responses) => {
                    if (responses.length === 2) {
                        setContacts(responses[0]);
                        setJobs(responses[1]);
                    } else {
                        setJobs(responses[0]);
                    }
                    setLoading(false);
                });
            } else {
                setLoading(false);
            }
        }
        loadData();
    }, [search])

    let job_lists;
    if (loading) {
        job_lists = <>loading...</>;
    } else {
        if (search) {
            job_lists = [];
            jobs.map((job) => {
                job_lists.push((
                    <div key={job.id} className="job">
                        <div>{job.name}</div>
                        <div>{new Date(job.start).toISOString().slice(0, 10)} to {new Date(job.end).toISOString().slice(0, 10)}</div>
                        <div>{contacts[job.contactId] && contacts[job.contactId].name || ''}</div>
                    </div>
                ));
            });

            if (job_lists.length === 0) {
                job_lists = <div>Search result is empty...</div>;
            }
        } else {
            job_lists = null;
        }
    }

    return (
        <SectionGroup>
            <SectionPanel>
                <input onChange={onChange} placeholder="Please input search term"/>
                {job_lists}
            </SectionPanel>
        </SectionGroup>
    )
}