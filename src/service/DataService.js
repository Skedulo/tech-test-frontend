import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';

const graphClient = new ApolloClient({
  uri: 'http://localhost:3500/graphql',
});

export const DataService = {
  getJobsWithSearchTerm: async searchTerm => {
    const { data } = await graphClient.query({
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
        searchTerm: searchTerm,
      },
    });

    const result = data.jobs.map(job => {
      return Object.assign({}, job, {
        id: job.id + '',
      });
    });

    return result;
  },

  getJobs: async () => {
    const { data } = await graphClient.query({
      query: gql`
        {
          jobs {
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
    });
    const result = data.jobs.map(job =>
      Object.assign({}, job, {
        id: job.id + '',
      }),
    );
    return result;
  },

  getActivities: async () => {
    const { data } = await graphClient.query({
      query: gql`
        {
          activities {
            id
            name
            start
            end
          }
        }
      `,
    });

    const result = data.activities.map(activitie =>
      Object.assign({}, activitie, {
        id: activitie.id + '',
      }),
    );
    return result;
  },

  getResources: async () => {
    const { data } = await graphClient.query({
      query: gql`
        {
          resources {
            id
            name
          }
        }
      `,
    });

    const result = data.resources.map(resource =>
      Object.assign({}, resource, {
        id: resource.id + '',
      }),
    );
    return result;
  },

  getJobAllocations: async () => {
    const { data } = await graphClient.query({
      query: gql`
        {
          jobAllocations {
            id
            resource {
              id
              name
            }
            job {
              id
              name
              start
              end
            }
          }
        }
      `,
    });
    const jobAllocations = data.jobAllocations.map(jobAllocation =>
      Object.assign({}, jobAllocation, {
        id: jobAllocation.id + '',
      }),
    );

    return jobAllocations;
  },

  getActivityAllocations: async () => {
    const { data } = await graphClient.query({
      query: gql`
        {
          activityAllocations {
            id
            resource {
              id
              name
            }
            activity {
              id
              name
              start
              end
            }
          }
        }
      `,
    });
    const activityAllocations = data.activityAllocations.map(
      activityAllocation =>
        Object.assign({}, activityAllocation, {
          id: activityAllocation.id + '',
        }),
    );

    return activityAllocations;
  },
};
