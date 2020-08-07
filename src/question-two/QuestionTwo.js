import React, {useState, useEffect} from 'react';

import { SectionGroup } from '../components/section/SectionGroup'
import { SectionPanel } from '../components/section/SectionPanel'
import { Swimlane } from '../components/swimlane/Swimlane'

import './QuestionTwo.css';

/**
 * Please do not change these dates, the data on the server all fall within the 01/09/2018
 */
const RANGE_START = new Date('2018-09-01T00:00:00Z')
const RANGE_END = new Date('2018-09-01T24:00:00Z')

export const QuestionTwo = (props) => {
  const [lanes, setLanes] = useState([])

  useEffect(() => {
    // console.log(props.service.getAllocates())
    const inDateRange = function(start,end){
      const check = start >= RANGE_START.getTime() && start < RANGE_END.getTime() && end > RANGE_START.getTime() && end <= RANGE_END.getTime() ? true : false;
      // console.log(check)
      return check
    }
    const renderCards = (events, jobId) => {
      return events.map(el => {
        return inDateRange(new Date(el?.start).getTime(), new Date(el?.end).getTime()) &&
          {
          id: el?.id, 
          start: new Date(el?.start).getTime(),
          end: new Date(el?.end).getTime(),
          className: 'swimlane__card--item',
          style: '',
          description: (jobId ? "Job: " : "Activity: ") + el?.name
        }
      })
    }
    const getJobsAllocation = async () => {
      const response = await props.service.getAllocates();
      const mappedResponse = response?.map(item => (
        {
          resourceId: item?.resources?.id,
          title: item?.resources?.name,
          cards: renderCards(item?.events, item.jobId)
        }
      ))
      // console.log(mappedResponse)
      setLanes(mappedResponse);
    }
    getJobsAllocation();
  }, [props.service])
  
  
  
  return (
    <SectionGroup>
      <SectionPanel>
        <Swimlane start={RANGE_START.getTime()} end={RANGE_END.getTime()} lanes={lanes}></Swimlane>
      </SectionPanel>
    </SectionGroup>
  )
}