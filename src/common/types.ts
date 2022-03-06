export interface IAppTabContainer {
  service: IDataService
}

export interface Job {
  id: number
  contactId: string
  start: string
  end: string
  location: string
  name: string
}

export interface Contact {
  id: number
  name: string
}

export interface Activity {
  id: number
  name: string
  start: string
  end: string
}

export interface JobAllocations {
  id: number
  jobId: number
  resourceId: number
}

export interface ActivityAllocations {
  id: number
  resourceId: number
  activityId: number
}

export interface Resource {
  id: number
  name: string
}

export interface JobAndActivityAllocations {
  resources: Resource[],
  activityAllocations: ActivityAllocationSingle[],
  jobAllocations: JobAllocationSingle[]
}

// not sure how to distinguish between this and ActivityAllocation
export interface ActivityAllocationSingle {
  resource: {
    id: number
  },
  activity: Pick<Activity, 'name' | 'start' | 'end'>
}

export interface JobAllocationSingle {
  resource: {
    id: number
  },
  job: Pick<Job, 'name' | 'start' | 'end'>
}

export type JobSearchFields = Pick<Job, 'name' | 'start' | 'end'> & { contact: Contact }

export interface IDataService {
  getJobs: () => Promise<Job[]>
  getJobsWithSearchTerm: (searchTerm: string) => Promise<JobSearchFields[]>
  getActivities: () => Promise<Activity[]>
  getJobAndActivityAllocations: () => Promise<JobAndActivityAllocations>,
  getJobAllocations: () => Promise<JobAllocations[]>
  getActivityAllocations: () => Promise<ActivityAllocations[]>
  getResources: () => Promise<Resource[]>
}
