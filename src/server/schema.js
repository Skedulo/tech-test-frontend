import { gql } from 'apollo-server-express'
import { Job, GenericModel } from './models'

const jobModel = new Job()
const contactModel = new GenericModel('contacts')
const activityModel = new GenericModel('activities')
const resourceModel = new GenericModel('resources')
const jobAllocationModel = new GenericModel('jobAllocations')
const activityAllocationModel = new GenericModel('activityAllocations')

export const typeDefs = gql`
  type Job {
    id: ID
    name: String
    contact: Contact
    start: String
    end: String
    location: String
  }
  
  type Activity {
    id: ID
    name: String
    start: String
    end: String
  }

  type Contact {
    id: ID
    name: String
  }

  type Resource {
    id: ID
    name: String
  }

  type JobAllocation {
    id: ID
    resource: Resource
    job: Job
  }

  type ActivityAllocation {
    id: ID
    resource: Resource
    activity: Activity
  }

  type Query {
    jobs(name: String): [Job],
    contacts: [Contact],
    activities: [Activity],
    resources: [Resource],
    jobAllocations: [JobAllocation],
    activityAllocations: [ActivityAllocation]   
  }
`

export const resolvers = {
  Query: {
    jobs(obj, args) {
      return jobModel.list()
        .then(results => results.filter(x => {
          if(!args.name) {
            return true
          }

          return x.name.toLowerCase().indexOf(args.name.toLowerCase()) >= 0
        }))
    },
    contacts() {
      return contactModel.list()
    },
    activities() {
      return activityModel.list()
    },
    resources() {
      return resourceModel.list()
    },
    jobAllocations() {
      return jobAllocationModel.list()
    },
    activityAllocations() {
      return activityAllocationModel.list()
    }
  },
  Job: {
    contact(source) {
      return contactModel.find(source.contactId)
    }
  },
  JobAllocation: {
    resource(source) {
      return resourceModel.find(source.resourceId)
    },
    job(source) {
      return jobModel.find(source.jobId)
    }
  },
  ActivityAllocation: {
    resource(source) {
      return resourceModel.find(source.resourceId)
    },
    activity(source) {
      return activityModel.find(source.activityId)
    }
  }
}
