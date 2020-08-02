import React, { useEffect, useState } from 'react';
import moment from 'moment';

import { SectionGroup } from '../components/section/SectionGroup'
import { SectionPanel } from '../components/section/SectionPanel'

import './QuestionThree.css'

const Header = ({children}) => <div className="header">{children}</div>

const JobList = ({jobs}) => <div className="job-list">
  { jobs.map(job => <JobItem key={job.id} {...job} />)}
</div>;

const JobItem = ({id, name, start, end, location, numOfResources}) => {
  return <div className="job">
    <div className="title"><span>{name}</span> (Job #{id})</div> 
    <div className="location">{location}</div>
    <div className="date">{moment(start).format('ddd MMM DD YYYY')}</div>
    <div className="duration">{moment(start).format('HH:mm')} - {moment(start).format("HH:mm")}</div>
    { numOfResources > 0 && <div className="num-of-resources">{numOfResources}</div> }
  </div>
}

const Content = () => <div className="content">
  { Array.from(Array(10).keys()).map(i => <div key={i} className="box" />)}
</div>;

export const QuestionThree = ({service}) => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    Promise.all([
      service.getJobs(),
      service.getJobAllocations()
    ]).then(([jobs, jobAllocations]) => {
      const updatedJobs = jobs.map(job => {
        const { id } = job;
        const numOfResources = jobAllocations.filter(jobAllocation => jobAllocation.jobId === id).length;
        return {...job, numOfResources}
      })
      setJobs(updatedJobs);
    })
  }, [])

  return (
    <SectionGroup>
      <SectionPanel>
        <div className="container">
          <Header>
            <div>Header</div>
            
          </Header>
          <div className="section">
              <JobList jobs={jobs}></JobList>
              <Content></Content>
          </div>
        </div>
      </SectionPanel>
    </SectionGroup>
  )
}