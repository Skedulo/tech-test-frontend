import { useReducer, useEffect } from 'react'
import { partition, merge, from, of, Subscribable, ObservableInput } from 'rxjs'
import { mergeMap, switchMap, delay, startWith, map, takeUntil, distinctUntilChanged } from 'rxjs/operators'
import {Job} from '../../types/Job'

interface State {
  jobs: Job[],
  isLoading: Boolean,
  isInitial: Boolean
}

const initialState: State = {
  jobs: [],
  isLoading: false,
  isInitial: true
}

enum Type {
  RESET_STATE= 'resetState',
  START_LOADING= 'startLoading',
  UPDATE_JOBS='updateJobs'
}

type Action = {
  type: Type
  payload?: Job[]
}

function reducer (state: State, action: Action): State {
  switch (action.type) {
    case Type.RESET_STATE:
      return initialState
    case Type.START_LOADING:
      return {
        ...state,
        isLoading: true,
        isInitial: false
      }
    case Type.UPDATE_JOBS:
      return {
        jobs: action.payload || [],
        isLoading: false,
        isInitial: false
      }
    default:
      throw new Error()
  }
}

export default (searchString$: Subscribable<string>, searchFn: (searchStr: string) => ObservableInput<Job[]> ) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    const [skipSearch$, canSearch$] = partition(searchString$, (val) => val.length < 3)

    const subscription = merge(
      skipSearch$.pipe(
        map(() => ({
          type: Type.RESET_STATE
        }))
      ),
      canSearch$.pipe(
        distinctUntilChanged(),
        switchMap(val =>
          of(null).pipe(
            delay(500),
            mergeMap(
              () => from(searchFn(val))
                .pipe(
                  map(payload => ({
                    type: Type.UPDATE_JOBS,
                    payload
                  }))
                )
            ),
            startWith(({
              type: Type.START_LOADING
            })),
            takeUntil(skipSearch$)
          )
        )
      )
    ).subscribe(dispatch)

    return () => {
      subscription.unsubscribe()
    }
  }, [searchString$, searchFn])

  return state
}
