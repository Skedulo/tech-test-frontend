import { useReducer, useEffect } from "react";

import {from, merge} from 'rxjs';
import {map} from 'rxjs/operators';

const initialState = {
  resources: [],
  jobAllocations: {},
  activityAllocations: {},
  loadingCounter: 3
};

function reducer(state, action) {
  switch (action.type) {
    case "updateResources":
      return {
        ...state,
        loadingCounter: state.loadingCounter - 1,
        resources: action.payload
      };
    case "updateJobAllocations":
      return {
        ...state,
        loadingCounter: state.loadingCounter - 1,
        jobAllocations: action.payload.reduce((acc, item) => ({
          ...acc,
          [item.resource.id]: [...(acc[item.resource.id] || []), item]
        }), {})
      };
    case "updateActivityAllocations":
      return {
        ...state,
        loadingCounter: state.loadingCounter - 1,
        activityAllocations: action.payload.reduce((acc, item) => ({
          ...acc,
          [item.resource.id]: [...(acc[item.resource.id] || []), item]
        }), {})
      };
    default:
      throw new Error();
  }
}

export default service => {
  const [{resources, activityAllocations, jobAllocations, loadingCounter}, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    let subscription = merge(
      from(service.getResources()).pipe(
        map(resources => ({
          type: "updateResources",
          payload: resources}))
      ),
      from(service.getJobAllocations()).pipe(
        map(jobAllocations => ({
          type: "updateJobAllocations",
          payload: jobAllocations}))
      ),
      from(service.getActivityAllocations()).pipe(
        map(activityAllocations => ({
          type: "updateActivityAllocations",
          payload: activityAllocations}))
      ),
    ).subscribe(dispatch)

    return () => {
      subscription.unsubscribe();
    }
  }, []);

  let swimelane = resources.map((resource) => ({
    key: resource.id,
    title: resource.name,
    cards: [
      ...(activityAllocations[resource.id] || []).map(({activity}) => ({
        description: `Activity ${activity.name}`,
        start: new Date(activity.start),
        end: new Date(activity.end)
      })),
      ...(jobAllocations[resource.id] || []).map(({job}) => ({
        description: `Job ${job.name}`,
        start: new Date(job.start),
        end: new Date(job.end)
      }))
    ]
  }))

  return {swimelane, isLoading: !loadingCounter};
};
