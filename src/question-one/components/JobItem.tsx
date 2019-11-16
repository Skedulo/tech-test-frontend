import React from 'react'
import { Job } from '../../types/Job'

interface JobItemProps {
  item: Job
}

const JobItem : React.FC<JobItemProps>= ({ item }) => (
  <div>
    <div>Jobs: {item.name}</div>
    <div>Start: {item.start}</div>
    <div>End: {item.end}</div>
    <div>Contact: {item.contact && item.contact.name}</div>
  </div>
)

export default JobItem
