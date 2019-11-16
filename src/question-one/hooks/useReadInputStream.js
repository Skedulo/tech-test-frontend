import { useState, useEffect } from 'react'
export default ($input) => {
  const [val, setVal] = useState('')

  useEffect(() => {
    const subscription = $input.subscribe(setVal)

    return () => {
      subscription.unsubscribe()
    }
  }, [$input, setVal])

  return val
}
