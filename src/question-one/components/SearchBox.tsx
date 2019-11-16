import React, {SyntheticEvent } from 'react'

import useReadInputStream from '../hooks/useReadInputStream'
import { Subscribable } from 'rxjs'

interface SearchBoxProps {
  value$: Subscribable<string>
  onChange: (event: SyntheticEvent) => void
}

const SearhBox: React.FC<SearchBoxProps> = ({ value$, onChange }) => {
  const value = useReadInputStream(value$)

  return <input value={value} onChange={onChange} />
}

export default SearhBox
