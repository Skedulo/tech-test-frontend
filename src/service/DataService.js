import ApolloClient from "apollo-boost";
import gql from "graphql-tag";
import Axios from "axios";
import countJobAllocations from "./utils/countJobAllocations";

const graphClient = new ApolloClient({
  uri: "http://localhost:3500/graphql"
});

const axiosClient = Axios.create({
  baseURL: "http://localhost:3400"
});

export const DataService = {
  //
  //  SAMPLE GraphQL Call
  //
  getJobsWithSearchTerm: searchTerm => {
    return graphClient
      .query({
        query: gql`
          query($searchTerm: String) {
            jobs(name: $searchTerm) {
              id
              name
              start
              end
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
      .then(data => data.jobs);
  },
  getJobsAndAllocations: async () => {
    const { data } = await graphClient.query({
      query: gql`
        query jobsAndAllocations {
          jobs {
            id
            name
            start
            end
          }
          jobAllocations {
            id
            job {
              id
            }
          }
        }
      `
    });
    return countJobAllocations(data);
  },
  getJobs: async () => {
    const results = await axiosClient.get("/jobs");
    return results;
  },
  getResources: async () => {
    const results = await axiosClient.get("/resources");
    return results;
  },
  getActivities: async () => {
    const results = await axiosClient.get("/activities");
    return results;
  },
  getJobAllocations: async () => {
    const results = await axiosClient.get("/jobAllocations");
    return results;
  },
  getActivityAllocations: async () => {
    const results = await axiosClient.get("/activityAllocations");
    return results;
  }
};
