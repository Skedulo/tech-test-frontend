import { renderHook, act } from '@testing-library/react-hooks'

import { Subject } from 'rxjs'

import useLoadSwimelane from './useLoadSwimelane'
import { Resource } from '../types/Resource'
import { JobAllocation } from '../types/JobAllocation'
import { ActivityAllocation } from '../types/ActivityAllocation'
import { ISwimeLaneService } from '../service/DataService'

describe('useLoadSwimelane', () => {
  it('should wait for resources response to return swimelane data', () => {
    const $resources = new Subject<Resource[]>()
    const $jobAllocations = new Subject<JobAllocation[]>()
    const $activityAllocations = new Subject<ActivityAllocation[]>()
    const services: ISwimeLaneService = {
      getResources: jest.fn(() => $resources),
      getJobAllocations: jest.fn(() => $jobAllocations),
      getActivityAllocations: jest.fn(() => $activityAllocations)
    }

    const { result } = renderHook(() => useLoadSwimelane(services))

    expect(result.current.isLoading).toBe(true)
    expect(result.current.swimelane).toEqual([])
    const mockResources = [{
      id: 'id',
      name: 'name'
    }]
    act(() => {
      $resources.next(mockResources)
    })

    expect(result.current.isLoading).toBe(true)
    expect(result.current.swimelane).toEqual([{
      key: 'id',
      title: 'name',
      cards: []
    }])

    const currentDate = new Date()
    const currentDateString= currentDate.toISOString()
    const mockJobAllocations = [{
      resource: {
        id: 'id'
      },
      job: {
        name: 'test job',
        start: currentDateString,
        end: currentDateString
      }
    }]
    act(() => {
      $jobAllocations.next(mockJobAllocations)
    })

    expect(result.current.isLoading).toBe(true)
    expect(result.current.swimelane).toEqual([{
      key: 'id',
      title: 'name',
      cards: [{
        description: 'Job test job',
        start: currentDate,
        end: currentDate
      }]
    }])

    const mockActivityllocations = [{
      resource: {
        id: 'id'
      },
      activity: {
        name: 'test activity',
        start: currentDateString,
        end: currentDateString
      }
    }]

    act(() => {
      $activityAllocations.next(mockActivityllocations)
    })

    expect(result.current.isLoading).toBe(false)
    expect(result.current.swimelane).toEqual([{
      key: 'id',
      title: 'name',
      cards: [{
        description: 'Activity test activity',
        start: currentDate,
        end: currentDate
      }, {
        description: 'Job test job',
        start: currentDate,
        end: currentDate
      }]
    }])
  })
})
