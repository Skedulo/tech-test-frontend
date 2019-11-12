import { useReducer, useEffect } from "react";

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
    Promise.all([
      service.getResources().then(resources =>
        dispatch({
          type: "updateResources",
          payload: resources
        })
      ),
      service.getJobAllocations().then(jobAllocations =>
        dispatch({
          type: "updateJobAllocations",
          payload: jobAllocations
        })
      ),
      service.getActivityAllocations().then(activityAllocations =>
        dispatch({
          type: "updateActivityAllocations",
          payload: activityAllocations
        })
      )
    ]);
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
