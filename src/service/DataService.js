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
  
  //  SAMPLE GraphQL Call
  
  getJobsWithSearchTerm: (searchTerm) => {
    let searchQrr = searchTerm.jobName;
    return graphClient.query({
      query: gql`
      query ($searchQrr: String){
        jobs(name: $searchQrr) {
          id,
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
        searchQrr: searchQrr
      }
    })
      .then(result => {
        // result.data
        return result
      })
      // .then(data => data.jobs)
  },

  
  //  SAMPLE Normal call
  
  getJobs: () => {
    return axiosClient.get('/jobs')
      .then(result => result.data.map(x => Object.assign({}, x, { id: x.id + '' })))
  },


  //  Fetch data from a couple of endpoints on the server.
  
  getJobAllocationsDatas: () => {
    return axiosClient.get('/jobAllocations')
    .then((result) => {
      return result.data.map(x => Object.assign({}, x, { id: x.id + '' }))
    })
    .then((result) => {
      const resource = axiosClient.get('/resources').then(res => {
        return result?.map((item)=>{
          const x =  JSON.stringify(res.data.filter(res => {
            return res.id === item.resourceId
          })).replace(/[\[\]']+/g,'')
          return Object.assign(item,{resources: JSON.parse(x)})
        })
      })
      return resource
    })
    .then(result => {
      const jobs = axiosClient.get('/jobs').then(res => {
        return result?.map((item)=>{
          const y =  JSON.stringify(res.data.filter(res => {
            return res.id === item.jobId
          })).replace(/[\[\]']+/g,'')
          return Object.assign(item,{events: JSON.parse(y)})
        })
      })
      return jobs
    })
    .then(result => {
      const assignedContact = axiosClient.get('/contacts').then(res => {
        return result?.map((item)=>{
          const z =  res.data.filter(res => {
            return Number(res.id) === Number(item.events.contactId)
          })
          item.events.contact = z
          return item
        })
      })
      return assignedContact
    })
  },
  getActivityAllocations: () => {
    return axiosClient.get('/activityAllocations')
      .then(result => {
        return result.data.map(x => Object.assign({}, x, { id: x.id + '' }))
      })
      .then(result => {
        const resource = axiosClient.get('/resources').then(res => {
          return result?.map((item)=>{
            const x =  JSON.stringify(res.data.filter(res => {
              return res.id === item.resourceId
            })).replace(/[\[\]']+/g,'')
            return Object.assign(item,{resources: JSON.parse(x)})
          })
        })
        return resource
      })
      .then(result => {
        const activities = axiosClient.get('/activities').then(res => {
          return result?.map((item)=>{
            const y =  JSON.stringify(res.data.filter(res => {
              return res.id === item.activityId
            })).replace(/[\[\]']+/g,'')
            return Object.assign(item,{events: JSON.parse(y)})
          })
        })
        return activities
      })
  },
  getAllocates: async () => {
    const arr1 = await DataService.getJobAllocationsDatas()
    const arr2 = (await DataService.getActivityAllocations()).map(item =>{
      item.events = new Array(item.events)
      return item
    })
    const mergeDuplicate = arr1.map((item, index) => {
      const duplicate = arr2.find(
        (item2) => item2?.resourceId === item?.resourceId
      );
    // console.log(duplicate)
      if (duplicate)
        return {
          ...item,
          ...duplicate,
          events: [ item?.events, duplicate?.events[0] ]
        }
      else {
        return {
          ...item,
          events: [ item?.events ]
        }
      }
    })
    
    const resourceIds = arr1.map((item) => item?.resourceId);
    const mergeDifferent = arr2.filter(
      (item) => resourceIds.indexOf(item?.resourceId) === -1
    )
    let count = 0
    const merged = ([...mergeDuplicate, ...mergeDifferent]).map(item => {
      count ++
      item.id = count
      return item
    })
    
    console.log(merged)
    return merged
  }
  
}