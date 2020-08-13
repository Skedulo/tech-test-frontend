import React, {useState, useEffect} from 'react';

import { SectionGroup } from '../components/section/SectionGroup'
import { SectionPanel } from '../components/section/SectionPanel'

import './QuestionTwo.css';

import {DataService} from "../service/DataService"
import { Swimlane } from "../components/swimlane/Swimlane"

var _ = require('underscore');

/**
 * Please do not change these dates, the data on the server all fall within the 01/09/2018
 */
const RANGE_START = new Date('2018-09-01T00:00:00Z')
const RANGE_END = new Date('2018-09-01T24:00:00Z')


export const QuestionTwo = (props) => {
  const [lanes, setLanes] =  useState([])
  const getAllData = () => {
    Promise.all([
      DataService.getResources(),
      DataService.getJobs(),
      DataService.getActivities(),
      DataService.getJobAllocations(),
      DataService.getActivityAllocations()
    ]).then(data => {
      setLanes(mapData(data))
    });
  }

  const mapData = (data) => {
    const [resources, jobs, activities, jobAllocations, activityAllocations] = data || []

    const jobCards = jobAllocations && jobAllocations.map(allocation => {
      const job = jobs.find(job => job.id === allocation.jobId + '');
      return Object.assign({}, allocation, job,
        {description: job && job.name},
        {start: new Date(job.start)},
        {end: new Date(job.end)},
        {className: 'swimlane__card__hover'}
      )
    })
    const activityCards = activityAllocations && activityAllocations.map(allocation => {
      const activity = activities.find(activity => activity.id === allocation.activityId + '');
      return Object.assign({}, allocation, activity,
        {description: activity && activity.name},
        {start: new Date(activity.start)},
        {end: new Date(activity.end)},
        {className: 'swimlane__card__hover'}
      )
    })
    const lanesData = resources && resources.map(person =>
      Object.assign({}, person, {
        title: person.name,
        cards: jobCards.filter(card => person.id === card.resourceId + '').concat(
                activityCards.filter(card => person.id === card.resourceId + ''))
      })
    )
    return lanesData
  }

  useEffect(() => {
    getAllData()
  }, []);
  return (
    <SectionGroup>
      <SectionPanel>
        <div style={{padding: '30px', textAlign: 'center'}}>
          Please refer to INSTRUCTIONS.md
          <hr style={{width: '200px'}}/>
          <Swimlane lanes={lanes || []} start={RANGE_START} end={RANGE_END} />
        </div>
      </SectionPanel>
    </SectionGroup>
  )
}