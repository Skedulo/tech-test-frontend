import { useReducer, useEffect } from 'react'
import { partition, merge, from, of } from 'rxjs'
import { mergeMap, switchMap, delay, startWith, map, takeUntil, distinctUntilChanged } from 'rxjs/operators'

const initialState = {
  jobs: [],
  isLoading: false,
  isInitial: true
}

function reducer (state, action) {
  switch (action.type) {
    case 'resetState':
      return initialState
    case 'startLoading':
      return {
        ...state,
        isLoading: true,
        isInitial: false
      }
    case 'updateJobs':
      return {
        jobs: action.payload,
        isLoading: false,
        isInitial: false
      }
    default:
      throw new Error()
  }
}

export default (searchString$, searchFn) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    const [skipSearch$, canSearch$] = partition(searchString$, (val) => val.length < 3)

    const subscription = merge(
      skipSearch$.pipe(
        map(() => ({
          type: 'resetState'
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
                    type: 'updateJobs',
                    payload
                  }))
                )
            ),
            startWith(({
              type: 'startLoading'
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
