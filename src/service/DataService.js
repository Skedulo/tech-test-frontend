import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';
import Axios from 'axios';

const graphClient = new ApolloClient({
  uri: 'http://localhost:3500/graphql'
});

const axiosClient = Axios.create({
  baseURL: 'http://localhost:3400'
})

export const DataService = {
  //
  //  SAMPLE GraphQL Call
  //
  // getJobsWithSearchTerm: (searchTerm) => {
  //   return graphClient.query({
  //     query: gql`
  //     query ($searchTerm: String){
  //       jobs(name: $searchTerm) {
  //         name,
  //         start,
  //         end,
  //         contact {
  //           id
  //           name
  //         }
  //       }
  //     }
  //     `,
  //     variables: {
  //       searchTerm: searchTerm
  //     }
  //   })
  //     .then(result => result.data)
  //     .then(data => data.jobs)
  // },

  //
  //  SAMPLE Normal call
  //
  // getJobs: () => {
  //   return axiosClient.get('/jobs')
  //     .then(result => result.data.map(x => Object.assign({}, x, { id: x.id + '' })))
  // },
  
}