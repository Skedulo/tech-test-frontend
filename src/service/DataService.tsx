import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';
import axios from 'axios';
import {
  Activity,
  ActivityAllocations,
  IDataService,
  Job,
  JobAllocations,
  JobAndActivityAllocations,
  JobSearchFields,
  Resource
} from '../common/types';

const graphClient = new ApolloClient({
  uri: 'http://localhost:3500/graphql'
});

const axiosClient = axios.create({
  baseURL: 'http://localhost:3400'
})

export const DataService: IDataService = {
  getJobsWithSearchTerm: (searchTerm: string) => {
    return graphClient.query<{ jobs: JobSearchFields[] }>({
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

  getJobAndActivityAllocations: () => {
    return graphClient.query<JobAndActivityAllocations>({
      query: gql`
      query jobAndActivityAllocations {
        resources {
          id
          name
        }
        activityAllocations {
          resource {
            id
          }
          activity {
            name
            start
            end
          }
        }
        jobAllocations {
          resource {
            id
          }
          job {
            name
            start
            end
          }
        }
      }
      `
    })
      .then(result => result.data)
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