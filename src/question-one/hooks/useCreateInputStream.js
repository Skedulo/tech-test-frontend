import { useMemo, useEffect, useCallback } from 'react'
import { BehaviorSubject } from 'rxjs'

const useCreateInputStream = () => {
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
