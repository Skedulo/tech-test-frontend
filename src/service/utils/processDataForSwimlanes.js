import groupBy from "lodash/groupBy";
import keyBy from "lodash/keyBy";

const resolveJobAllocations = ({
  resourceId,
  jobAllocationsByResourceId,
  jobsById
}) =>
  (jobAllocationsByResourceId[resourceId] || [])
    .map(jobAlloc => jobAlloc.jobId)
    .map(jobId => jobsById[jobId]);

const resolveActivityAllocation = ({
  resourceId,
  activityAllocationsByResourceId,
  activitiesById
}) =>
  (activityAllocationsByResourceId[resourceId] || [])
    .map(activityAlloc => activityAlloc.activityId)
    .map(activityId => activitiesById[activityId]);

const processDataForSwimlanes = ({
  resources,
  jobs,
  activities,
  activityAllocations,
  jobAllocations
}) => {
  // Build job lookups
  const jobAllocationsByResourceId = groupBy(jobAllocations, "resourceId");
  const jobsById = keyBy(jobs, "id");

  // Build activity lookups
  const activityAllocationsByResourceId = groupBy(
    activityAllocations,
    "resourceId"
  );
  const activitiesById = keyBy(activities, "id");

  const lanes = resources.map(resource => {
    const resourcesJobs = resolveJobAllocations({
      resourceId: resource.id,
      jobAllocationsByResourceId,
      jobsById
    });
    const resourcesActivities = resolveActivityAllocation({
      resourceId: resource.id,
      activityAllocationsByResourceId,
      activitiesById
    });
    return {
      ...resource,
      jobs: resourcesJobs,
      activities: resourcesActivities
    };
  });

  return lanes;
};

export default processDataForSwimlanes;
