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
};
