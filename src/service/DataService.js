import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';
import Axios from 'axios';

const graphClient = new ApolloClient({ uri: 'http://localhost:3500/graphql' });
const axiosClient = Axios.create({ baseURL: 'http://localhost:3400' });

export const DataService = {

    graphQL: {
        getJobsWithSearchTerm: (searchTerm) => {
            return graphClient.query({
                query: gql`
          query ($searchTerm: String){
            jobs(name: $searchTerm) {
              id,
              name,
              start,
              end,
              contact {
                id
                name
              }
            }
          }`,
                variables: {
                    searchTerm: searchTerm
                }
            })
                .then(result => result.data)
                .then(data => new Promise(resolve => setTimeout(() => {
                    return resolve(data);
                }, 500)))
                .then(data => data.jobs)
        },
    },

    rest: {
        getDayPlan: async () => {
            const [resources, jobAllocations, jobs, contacts, activities, activityAllocations] = await Promise.all(
                getAll('resources', 'jobAllocations', 'jobs', 'contacts', 'activities', 'activityAllocations')
            );
            const results = resources.map(resource => {
                const jobEvents = jobAllocations
                    .filter(ja => ja.resourceId === resource.id)
                    .map(ja => {
                        const job = jobs.find(job => job.id === ja.jobId);
                        if (!job) return null;
                        return {
                            type: 'job',
                            contact: contacts.find(contact => contact.id === parseInt(job.contactId)),
                            ...job
                        }
                    });

                const activityEvents = activityAllocations
                    .filter(aa => aa.resourceId === resource.id)
                    .map(aa => {
                        const activity = activities.find(activity => activity.id === aa.activityId);
                        if (!activity) return null;
                        return {
                            type: 'activity',
                            ...activity
                        }
                    });

                const schedule = [...jobEvents, ...activityEvents].filter(event => event); // remove nulls

                return {
                    ...resource,
                    schedule
                }
            });

            return results;
        },
    }

};

function getAll(...endpoints) {
    const promises = [];
    for (const endpoint of endpoints) {
        promises.push(axiosClient.get(`/${endpoint}`).then(result => result.data));
    }
    return promises;
}
