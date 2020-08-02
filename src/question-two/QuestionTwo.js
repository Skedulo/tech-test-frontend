import React, { useState, useEffect } from 'react';

import { SectionGroup } from '../components/section/SectionGroup'
import { SectionPanel } from '../components/section/SectionPanel'
import { Swimlane } from '../components/swimlane/Swimlane';

import './QuestionTwo.css';

/**
 * Please do not change these dates, the data on the server all fall within the 01/09/2018
 */
const RANGE_START = new Date('2018-09-01T00:00:00Z')
const RANGE_END = new Date('2018-09-01T24:00:00Z')

const converDateStrToInt = dateStr => new Date(dateStr).getTime();

export const QuestionTwo = ({ service }) => {
  const [lanes, setLanes] = useState([]);
  useEffect(() => {
    Promise.all([
      service.getResources(),
      service.getActivities(),
      service.getJobAllocations(),
      service.getActivityAllocations(),
      service.getJobs()
    ]).then((result) => {
      console.log(result);
      const [resources, activities, jobAllocations, activityAllocations, jobs] = result;
      const transformJobs = {};
      jobs.forEach(job => transformJobs[job.id] = job)

      const laneList = [];
      resources.forEach(({name: resourceName, id: resourceId}) => {
        const cards = [];
        jobAllocations.filter(jobAllocation => jobAllocation.resourceId === resourceId)
          .forEach(({jobId}) => {
            const job = transformJobs[jobId]
            cards.push({
              description: job.name,
              start: converDateStrToInt(job.start),
              end: converDateStrToInt(job.end)
            })
          })
        activityAllocations.filter(activityAllocation => activityAllocation.resourceId === resourceId)
          .forEach(({activityId}) => {
            const activity = activities[activityId]
            cards.push({
              description: activity.name,
              start: converDateStrToInt(activity.start),
              end: converDateStrToInt(activity.end)
            })
          })
        laneList.push({
          title: resourceName,
          cards
        })
      })
      debugger;
      setLanes(laneList);
    });
  }, [])
  return (
    <SectionGroup>
      <SectionPanel>
        <Swimlane lanes={lanes} start={RANGE_START.getTime()} end={RANGE_END.getTime()}/>
      </SectionPanel>
    </SectionGroup>
  )
}