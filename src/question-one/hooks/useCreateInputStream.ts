import { useMemo, useEffect, useCallback, SyntheticEvent } from 'react'
import { BehaviorSubject, Subscribable } from 'rxjs'

const useCreateInputStream = (): [Subscribable<string>, (event: SyntheticEvent) => void] => {
  const value$ = useMemo(() => new BehaviorSubject(''), [])
  const onChange = useCallback(
    event => {
      value$.next(event.target.value)
    },
    [value$]
  )

  useEffect(
    () => () => {
      value$.complete()
    },
    [value$]
  )

  return [
    value$,
    onChange
  ]
}

export default useCreateInputStream
