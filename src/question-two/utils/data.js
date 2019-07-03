import { groupBy, keyBy } from "lodash-es";
import { toJobCard, toActivityCard } from "./toCard";

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
    const jobCards = resolveJobAllocations({
      resourceId: resource.id,
      jobAllocationsByResourceId,
      jobsById
    }).map(toJobCard);
    const activityCards = resolveActivityAllocation({
      resourceId: resource.id,
      activityAllocationsByResourceId,
      activitiesById
    }).map(toActivityCard);
    return {
      title: resource.name,
      cards: [...jobCards, ...activityCards]
    };
  });

  return lanes;
};

export { processDataForSwimlanes };
