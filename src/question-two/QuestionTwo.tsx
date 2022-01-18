import { isEmpty, keyBy } from "lodash"
import React, { useEffect, useState } from "react"
import { Activity, ActivityAllocations, IAppTabContainer, Job, JobAllocations, Resource } from "../common/types"

import { SectionGroup } from "../components/section/SectionGroup"
import { SectionPanel } from "../components/section/SectionPanel"

interface ResourceSchedule {
  resourceName: string
  resourceId: number
  allocations: {
    allocType: 'job' | 'activity',
    name: string,
    start: string,
    end: string
  }[]
}

export const QuestionTwo: React.FC<IAppTabContainer> = ({ service }) => {

  const [resourceSchedules, setResourceSchedules] = useState<ResourceSchedule[]>([]);

  const fetchResourceSchedules = async () => {
    const {
      getResources,
      getJobAllocations,
      getJobs,
      getActivityAllocations,
      getActivities
    } = service;
    const [resources, jobAllocations, jobs, activityAllocations, activities] = await Promise.all([
      getResources(),
      getJobAllocations(),
      getJobs(),
      getActivityAllocations(),
      getActivities()
    ]);

    if (isEmpty(resources)) {
      return [];
    }

    //Fetch resources
    const resourceSchedules = (resources as Resource[]).map(({ id, name }) => {
      return {
        resourceName: name,
        resourceId: id,
        allocations: []
      }
    });

    const toMap = function <T>(data: T[], keys: string) {
      return !isEmpty(data) ? keyBy(data, keys) : {};
    }
    const resourceScheduleMap = toMap<ResourceSchedule>(resourceSchedules, 'resourceId');
    const jobMap = toMap<Job>(jobs as Job[], 'id');
    const activityMap = toMap<Activity>(activities as Activity[], 'id');


    //Map job allocations
    if (!isEmpty(activityAllocations)) {
      (activityAllocations as ActivityAllocations[]).forEach(({resourceId, activityId}) => {
        const resourceSchedule = resourceScheduleMap[resourceId];
        const activity = activityMap[activityId];
        if (resourceSchedule && activity) {
          resourceSchedule.allocations.push({
            allocType: 'activity',
            name: activity.name,
            start: activity.start,
            end: activity.end
          });
        }
      });
    }

    //Map activity allocation
    if (!isEmpty(jobAllocations)) {
      (jobAllocations as JobAllocations[]).forEach(({resourceId, jobId}) => {
        const resourceSchedule = resourceScheduleMap[resourceId];
        const job = jobMap[jobId];
        if (resourceSchedule && job) {
          resourceSchedule.allocations.push({
            allocType: 'job',
            name: job.name,
            start: job.start,
            end: job.end
          });
        }
      });
    }
    setResourceSchedules(resourceSchedules);
  }

  useEffect(() => {
    fetchResourceSchedules();
  },[])

  return (
    <SectionGroup>
      <SectionPanel>{JSON.stringify(resourceSchedules)}</SectionPanel>
    </SectionGroup>
  )
}
