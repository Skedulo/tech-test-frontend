import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';
import axios from 'axios';
import { Activity, ActivityAllocations, Contact, IDataService, Job, JobAllocations, Resource } from '../common/types';

const graphClient = new ApolloClient({
  uri: 'http://localhost:3500/graphql'
});

const axiosClient = axios.create({
  baseURL: 'http://localhost:3400'
})

export const DataService: IDataService = {
  getJobsWithSearchTerm: (searchTerm: string) => {
    return graphClient.query<{ jobs: Pick<Job, 'name' | 'start' | 'end'> & { contact: Contact }[] }>({
      query: gql`
      query ($searchTerm: String){
        jobs(name: $searchTerm) {
          name,
          start,
          end,
          contact {
            id
            name
          }
        }
      }
      `,
      variables: {
        searchTerm: searchTerm
      }
    })
      .then(result => result.data)
      .then(data => data.jobs)
  },

  getJobs: () => {
    return axiosClient
      .get<Job[]>('/jobs')
      .then(result => result.data)
  },

  getActivities: () => {
    return axiosClient
      .get<Activity[]>('/activities')
      .then(result => result.data)
  },

  getJobAllocations: () => {
    return axiosClient
      .get<JobAllocations[]>('/jobAllocations')
      .then(result => result.data)
  },

  getActivityAllocations: () => {
    return axiosClient
      .get<ActivityAllocations[]>('/activityAllocations')
      .then(result => result.data)
  },

  getResources: () => {
    return axiosClient
      .get<Resource[]>('/resources')
      .then(result => result.data)
  }
}