import groupBy from "lodash/groupBy";

const countJobAllocations = ({ jobs, jobAllocations }) => {
  const jobAllocationsByJobId = groupBy(jobAllocations, "job.id");
  const jobsWithAllocationCount = jobs.reduce((jobsWithCounts, job) => {
    const allocations = jobAllocationsByJobId[job.id] || [];
    const allocationCount = allocations.length;
    jobsWithCounts.push({
      ...job,
      allocationCount
    });
    return jobsWithCounts;
  }, []);

  return jobsWithAllocationCount;
};

export default countJobAllocations;
