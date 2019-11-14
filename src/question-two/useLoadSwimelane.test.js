import { renderHook, act } from "@testing-library/react-hooks";

import {Subject} from 'rxjs';

import useLoadSwimelane from "./useLoadSwimelane";

describe("useLoadSwimelane", () => {
  it("should wait for resources response to get swimelane data", () => {
    let $resources = new Subject();
    let $jobAllocations = new Subject();
    let $activityAllocations = new Subject();
    let services = {
      getResources:jest.fn(() => $resources),
      getJobAllocations:jest.fn(() =>$jobAllocations),
      getActivityAllocations:jest.fn(() => $activityAllocations),
    };

    const { result } = renderHook(() => useLoadSwimelane(services));

    expect(result.current.isLoading).toBe(true);
    expect(result.current.swimelane).toEqual([]);
    const mockResources = [{
      id: 'id',
      name: 'name'
    }]
    act(() => {
      $resources.next(mockResources)
    })

    expect(result.current.isLoading).toBe(true);
    expect(result.current.swimelane).toEqual([{
      key: 'id',
      title: 'name',
      cards: []
    }]);
    let currentDate = new Date();
    const mockJobAllocations = [{
      resource: {
        id: 'id'
      },
      job: {
        name: 'test job',
        start: currentDate,
        end: currentDate
      }
    }]
    act(() => {
      $jobAllocations.next(mockJobAllocations)
    })

    expect(result.current.isLoading).toBe(true);
    expect(result.current.swimelane).toEqual([{
      key: 'id',
      title: 'name',
      cards: [{
        description: `Job test job`,
        start: currentDate,
        end: currentDate
      }]
    }]);

    const mockActivityllocations = [{
      resource: {
        id: 'id'
      },
      activity: {
        name: 'test activity',
        start: currentDate,
        end: currentDate
      }
    }]

    act(() => {
      $activityAllocations.next(mockActivityllocations)
    })

    expect(result.current.isLoading).toBe(false);
    expect(result.current.swimelane).toEqual([{
      key: 'id',
      title: 'name',
      cards: [{
        description: `Activity test activity`,
        start: currentDate,
        end: currentDate
      }, {
        description: `Job test job`,
        start: currentDate,
        end: currentDate
      }]
    }]);
  });
});
