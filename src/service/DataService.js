import ApolloClient from "apollo-boost";
import gql from "graphql-tag";
import Axios from "axios";
import countJobAllocations from "./utils/countJobAllocations";
import processDataForSwimlanes from "./utils/processDataForSwimlanes";

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
    const { data: jobs } = await axiosClient.get("/jobs");
    return jobs;
  },
  getResources: async () => {
    const { data: resources } = await axiosClient.get("/resources");
    return resources;
  },
  getActivities: async () => {
    const { data: activities } = await axiosClient.get("/activities");
    return activities;
  },
  getJobAllocations: async () => {
    const { data: jobAllocations } = await axiosClient.get("/jobAllocations");
    return jobAllocations;
  },
  getActivityAllocations: async () => {
    const { data: activityAllocations } = await axiosClient.get(
      "/activityAllocations"
    );
    return activityAllocations;
  },
  getSwimlaneData: async function() {
    const [
      jobs,
      resources,
      activities,
      jobAllocations,
      activityAllocations
    ] = await Promise.all([
      this.getJobs(),
      this.getResources(),
      this.getActivities(),
      this.getJobAllocations(),
      this.getActivityAllocations()
    ]);

    return processDataForSwimlanes({
      jobs,
      resources,
      activities,
      jobAllocations,
      activityAllocations
    });
  }
};
