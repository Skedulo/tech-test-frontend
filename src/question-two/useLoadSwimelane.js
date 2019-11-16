import { useReducer, useEffect } from 'react'

import { from, merge } from 'rxjs'
import { map } from 'rxjs/operators'

const TYPES = {
  UPDATE_RESOURCES: 'updateResources',
  UPDATE_JOB_ALLOCATIONS: 'updateJobAllocations',
  UPDATE_ACTIVITY_ALLOCATIONS: 'updateActivityAllocations'
}

const initialState = {
  resources: [],
  jobAllocations: {},
  activityAllocations: {},
  loadingCounter: 3
}

function reducer (state, action) {
  switch (action.type) {
    case TYPES.UPDATE_RESOURCES:
      return {
        ...state,
        loadingCounter: state.loadingCounter - 1,
        resources: action.payload
      }
    case TYPES.UPDATE_JOB_ALLOCATIONS:
      return {
        ...state,
        loadingCounter: state.loadingCounter - 1,
        jobAllocations: action.payload.reduce((acc, item) => ({
          ...acc,
          [item.resource.id]: [...(acc[item.resource.id] || []), item]
        }), {})
      }
    case TYPES.UPDATE_ACTIVITY_ALLOCATIONS:
      return {
        ...state,
        loadingCounter: state.loadingCounter - 1,
        activityAllocations: action.payload.reduce((acc, item) => ({
          ...acc,
          [item.resource.id]: [...(acc[item.resource.id] || []), item]
        }), {})
      }
    default:
      throw new Error()
  }
}

export default service => {
  const [{ resources, activityAllocations, jobAllocations, loadingCounter }, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    const subscription = merge(
      from(service.getResources()).pipe(
        map(resources => ({
          type: TYPES.UPDATE_RESOURCES,
          payload: resources
        }))
      ),
      from(service.getJobAllocations()).pipe(
        map(jobAllocations => ({
          type: TYPES.UPDATE_JOB_ALLOCATIONS,
          payload: jobAllocations
        }))
      ),
      from(service.getActivityAllocations()).pipe(
        map(activityAllocations => ({
          type: TYPES.UPDATE_ACTIVITY_ALLOCATIONS,
          payload: activityAllocations
        }))
      )
    ).subscribe(dispatch)

    return () => {
      subscription.unsubscribe()
    }
  }, [service])

  const swimelane = resources.map((resource) => ({
    key: resource.id,
    title: resource.name,
    cards: [
      ...(activityAllocations[resource.id] || []).map(({ activity }) => ({
        key: activity.id,
        description: `Activity ${activity.name}`,
        start: new Date(activity.start),
        end: new Date(activity.end)
      })),
      ...(jobAllocations[resource.id] || []).map(({ job }) => ({
        key: job.id,
        description: `Job ${job.name}`,
        start: new Date(job.start),
        end: new Date(job.end)
      }))
    ]
  }))

  return { swimelane, isLoading: !!loadingCounter }
}
