import { JobAndActivityAllocations, Resource} from "../common/types"
import { ResourceSchedule } from "./QuestionTwo";

type AllocType = 'job' | 'activity'

type MappedAllocation = {
  allocType: AllocType,
  name: string,
  start: string,
  end: string
}

export const mapToUi = (data: JobAndActivityAllocations): ResourceSchedule[] => {
  const { activityAllocations, jobAllocations, resources } = data;
  return resources.map((resource: Resource) => {
    const resourceId: number = resource.id
    const activityAllocationsPerResourceId: MappedAllocation[] = _getMatchingResources({
      allocations: activityAllocations,
      resourceId,
      type: 'activity'
    })
    const jobAllocationsPerResourceId: MappedAllocation[] = _getMatchingResources({
      allocations: jobAllocations,
      resourceId,
      type: 'job'
    })
    const allocations: MappedAllocation[] = [...activityAllocationsPerResourceId, ...jobAllocationsPerResourceId] // Sorting not added
    return {
      resourceName: resource.name,
      resourceId,
      allocations
    }
  })
}

type resourceIdType = number
interface IMatchingResourceParams {
  allocations: any,
  resourceId: resourceIdType,
  type: AllocType
}

const _getMatchingResources = (params: IMatchingResourceParams): MappedAllocation[] => {
  const { allocations, resourceId, type } = params

  return allocations
    .filter((allocation: any) => allocation.resource.id === resourceId)
    .map((matchingAllocation: any) => {
      const jobEntity = type === 'job'
        ? matchingAllocation.job
        : matchingAllocation.activity
      return {
        allocType: type,
        name: jobEntity.name,
        start: jobEntity.start,
        end: jobEntity.end
      }
    })
}