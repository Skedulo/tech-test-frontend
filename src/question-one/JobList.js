import React from 'react';

const Job = ({name, start, end, contact}) => <div className="job">
    <div>{name}</div>
    <div>{start} - {end}</div>
    <div>{contact.name}</div>
</div>

const JobList = ({ jobs }) => <ul>
    {jobs.map(job => <li key={job.id}><Job {...job} /></li>)}
</ul>

export default JobList;