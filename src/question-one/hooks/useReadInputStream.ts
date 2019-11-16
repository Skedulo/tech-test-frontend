import { useState, useEffect } from 'react'
import { Subscribable } from 'rxjs'


export default ($input: Subscribable<string>) => {
  const [val, setVal] = useState('')

  useEffect(() => {
    const subscription = $input.subscribe(setVal)

    return () => {
      subscription.unsubscribe()
    }
  }, [$input, setVal])

  return val
}
