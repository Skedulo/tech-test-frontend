import ApolloClient from 'apollo-boost'
import { gql } from 'graphql.macro'
// import Axios from 'axios'

const graphClient = new ApolloClient({
  uri: 'http://localhost:3500/graphql'
})

// const axiosClient = Axios.create({
//   baseURL: 'http://localhost:3400'
// })

export const DataService = {

  getJobsWithSearchTerm: (searchTerm) => {
    return graphClient.query({
      query: gql`
      query ($searchTerm: String){
        jobs(name: $searchTerm) {
          id,
          name,
          start,
          end,
          location,
          contact {
            id
            name
          }
          jobAllocations {
            id
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

  getResources: () => {
    return graphClient.query({
      query: gql`
      query {
        resources {
          id,
          name
        }
      }
      `
    })
      .then(result => result.data)
      .then(data => data.resources)
  },

  getJobAllocations: () => {
    return graphClient.query({
      query: gql`
      query {
        jobAllocations {
          id,
          resource {
            id
          }
          job {
            id,
            name,
            start,
            end
          }
        }
      }
      `
    })
      .then(result => result.data)
      .then(data => data.jobAllocations)
  },

  getActivityAllocations: () => {
    return graphClient.query({
      query: gql`
      query {
        activityAllocations {
          id,
          resource {
            id
          }
          activity {
            id,
            name,
            start,
            end
          }
        }
      }
      `
    })
      .then(result => result.data)
      .then(data => data.activityAllocations)
  }

}
