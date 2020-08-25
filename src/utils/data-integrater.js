// integrate different JSON data sources to match requirement of display format of data

export const integrateContactsIntoJobs = (contacts, jobs) => {
  jobs.forEach((job) => {
    job.contactName = contacts[job.contactId]
      ? contacts[job.contactId].name
      : "";
  });
};

export const integrateJobsIntoResources = (jobs, jobAllocations, resources) => {
  resources.forEach((resource) => {
    resource.jobsInfo = [];
    const resourceId = resource.id;
    for (const allocation of jobAllocations) {
      if (Number(allocation.resourceId) === Number(resourceId)) {
        resource.jobsInfo.push(jobs[allocation.jobId]);
      }
    }
  });
};

export const integrateActivitiesIntoResources = (
  activities,
  activityAllocations,
  resources
) => {
  resources.forEach((resource) => {
    resource.activitiesInfo = [];
    const resourceId = resource.id;
    for (const allocation of activityAllocations) {
      if (Number(allocation.resourceId) === Number(resourceId)) {
        resource.activitiesInfo.push(activities[allocation.activityId]);
      }
    }
  });
};

export const integrateJobsAllocationIntoJobs = (jobAllocations, jobs) => {
  jobs.forEach((job) => {
    job.numOfAllocations = 0;
    for (const jobAllocation of jobAllocations) {
      if (Number(job.id) === Number(jobAllocation.jobId)) {
        job.numOfAllocations++;
      }
    }
  });
};
