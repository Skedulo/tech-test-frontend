import React, {useState, useEffect}  from 'react';

import { SectionGroup } from '../components/section/SectionGroup'
import { SectionPanel } from '../components/section/SectionPanel'
import SideBar from '../components/sidebar'
import Header from '../components/header'
import JobList from '../components/joblist'
import BoxList from '../components/boxlist'
import Content from '../components/content'
import colors from '../style/colors'


import './QuestionThree.css'
import {DataService} from "../service/DataService"


export const QuestionThree = (props) => {
  const color = colors.light
  const [jobs, setJobs] =  useState([]);

  const getAllData = () => {
    Promise.all([
      DataService.getJobs(),
      DataService.getJobAllocations(),
    ]).then(data => {
      setJobs(mapData(data))
    });
  }

  const mapData = (data) => {
    const [jobs, jobAllocations] = data || []
    const jobCards = jobs && jobs.map(job => {
      const allocationMatches = jobAllocations 
            && jobAllocations.filter(allocation => job.id === allocation.jobId + '')
      return Object.assign({}, job,
        {allocationCount: allocationMatches.length}
      )
    })
    return jobCards
  }

  useEffect(() => {
    getAllData();
  }, []);

  return (
    <SectionGroup>
      <SectionPanel>
        <SideBar color={color} />
        <Header color={color}> 
          <span>Header</span>
        </Header>
        <Content
          color={color} 
          left={<JobList color={color} jobs={jobs}/> }
          right={<BoxList color={color} jobs={jobs}/>}
        />
      </SectionPanel>
    </SectionGroup>
  )
}