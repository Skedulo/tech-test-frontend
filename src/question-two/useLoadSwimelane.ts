import { useReducer, useEffect } from 'react'

import { from, merge } from 'rxjs'
import { map } from 'rxjs/operators'
import { Resource } from '../types/Resource'
import { JobAllocation } from '../types/JobAllocation'
import { ActivityAllocation } from '../types/ActivityAllocation'
import { ISwimeLaneService } from '../service/DataService'

enum Types  {
  UPDATE_RESOURCES= 'updateResources',
  UPDATE_JOB_ALLOCATIONS= 'updateJobAllocations',
  UPDATE_ACTIVITY_ALLOCATIONS= 'updateActivityAllocations'
}

interface State {
  resources: Resource[],
  jobAllocations: Record<string, JobAllocation[]>,
  activityAllocations: Record<string, ActivityAllocation[]>,
  loadingCounter: number
}

type Action = {type: Types.UPDATE_ACTIVITY_ALLOCATIONS, payload: ActivityAllocation[]} |
              {type: Types.UPDATE_JOB_ALLOCATIONS, payload: JobAllocation[]} |
              {type: Types.UPDATE_RESOURCES, payload: Resource[]}

const initialState = {
  resources: [],
  jobAllocations: {},
  activityAllocations: {},
  loadingCounter: 3
}

function reducer (state: State, action: Action): State {
  switch (action.type) {
    case Types.UPDATE_RESOURCES:
      return {
        ...state,
        loadingCounter: state.loadingCounter - 1,
        resources: action.payload
      }
    case Types.UPDATE_JOB_ALLOCATIONS:
      return {
        ...state,
        loadingCounter: state.loadingCounter - 1,
        jobAllocations: action.payload.reduce<Record<string, JobAllocation[]>>((acc, item) => ({
          ...acc,
          [item.resource.id]: [...(acc[item.resource.id] || []), item]
        }), {})
      }
    case Types.UPDATE_ACTIVITY_ALLOCATIONS:
      return {
        ...state,
        loadingCounter: state.loadingCounter - 1,
        activityAllocations: action.payload.reduce<Record<string, ActivityAllocation[]>>((acc, item) => ({
          ...acc,
          [item.resource.id]: [...(acc[item.resource.id] || []), item]
        }), {})
      }
    default:
      throw new Error()
  }
}

export default (service: ISwimeLaneService)  => {
  const [{ resources, activityAllocations, jobAllocations, loadingCounter }, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    const subscription = merge<Action, Action>(
      from(service.getResources()).pipe(
        map(resources => ({
          type: Types.UPDATE_RESOURCES,
          payload: resources
        }))
      ),
      from(service.getJobAllocations()).pipe(
        map(jobAllocations => ({
          type: Types.UPDATE_JOB_ALLOCATIONS,
          payload: jobAllocations
        }))
      ),
      from(service.getActivityAllocations()).pipe(
        map(activityAllocations => ({
          type: Types.UPDATE_ACTIVITY_ALLOCATIONS,
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
