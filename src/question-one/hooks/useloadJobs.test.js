import { renderHook, act } from "@testing-library/react-hooks";

import { BehaviorSubject } from "rxjs";

import useLoadJobs from "./useLoadJobs";

describe("useLoadJobs", () => {
  it("should return initial state when lastest node is less than 3 character", () => {
    let test$ = new BehaviorSubject("");
    let searchFn = jest.fn();

    const { result } = renderHook(() => useLoadJobs(test$, searchFn));

    expect(result.current.isLoading).toBe(false);
    expect(result.current.isInitial).toBe(true);
    expect(result.current.jobs).toEqual([]);
  });

  it("should unsubscibe input stream when unmount", () => {
    let test$ = new BehaviorSubject("");
    let searchFn = jest.fn();

    const { unmount } = renderHook(() => useLoadJobs(test$, searchFn));

    expect(test$.observers.length).toBeGreaterThanOrEqual(1);

    act(() => {
      unmount();
    });

    expect(test$.observers.length).toBe(0);
  });

  it("can startLoading as soon as input stream emit with more than 3 characters", () => {
    let test$ = new BehaviorSubject("123");
    let searchFn = jest.fn();

    const { result } = renderHook(() => useLoadJobs(test$, searchFn));

    expect(result.current.isLoading).toBe(true);
    expect(result.current.jobs).toEqual([]);
  });

  it("should call searchFn after some delay", async () => {
    let test$ = new BehaviorSubject("123");
    let searchFn = jest.fn().mockReturnValue(["jobs"]);

    const { result } = renderHook(() => useLoadJobs(test$, searchFn));

    expect(searchFn.mock.calls.length).toBe(0);
    await act(
      async () =>
        new Promise(resolve => {
          setTimeout(resolve, 600);
        })
    );

    expect(searchFn.mock.calls.length).toBe(1);
    expect(searchFn.mock.calls[0][0]).toBe("123");
    expect(result.current.isLoading).toBe(false);
    expect(result.current.jobs).toBe("jobs");
  });

  it("can return to inital state as soon as there are input with less than 3 character", async () => {
    let test$ = new BehaviorSubject("123");
    let searchFn = jest.fn();

    const { result } = renderHook(() => useLoadJobs(test$, searchFn));

    expect(result.current.isLoading).toBe(true);
    expect(result.current.jobs).toEqual([]);
    expect(searchFn.mock.calls.length).toBe(0);

    act(() => {
      test$.next("");
    });

    expect(result.current.isLoading).toBe(false);

    await act(
      async () =>
        new Promise(resolve => {
          setTimeout(resolve, 1000);
        })
    );

    // skip calling data fetch entirely
    expect(searchFn.mock.calls.length).toBe(0);
  });

  it("can debounce if the input stream change rapidly", async () => {
    let test$ = new BehaviorSubject("first text");
    let searchFn = jest.fn(val => [`mock-jobs of ${val}`]);
    const expectCallVal = "next text";

    const { result } = renderHook(() => useLoadJobs(test$, searchFn));

    expect(result.current.isLoading).toBe(true);
    expect(result.current.jobs).toEqual([]);
    expect(searchFn.mock.calls.length).toBe(0);

    await act(async () => {
      await new Promise(resolve => {
        setTimeout(resolve, 300);
      });
      test$.next(expectCallVal);
    });

    expect(result.current.isLoading).toBe(true);
    expect(searchFn.mock.calls.length).toBe(0);

    await act(async () => {
      await new Promise(resolve => {
        setTimeout(resolve, 600);
      });
    });

    // only call searchFn with latest aguments
    expect(searchFn.mock.calls.length).toBe(1);
    expect(searchFn.mock.calls[0][0]).toBe(expectCallVal);
    expect(result.current.jobs).toBe(`mock-jobs of ${expectCallVal}`);
  });
});
