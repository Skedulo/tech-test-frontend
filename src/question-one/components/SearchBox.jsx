import React from 'react'
import PropTypes from 'prop-types'

import useReadInputStream from '../hooks/useReadInputStream'

const SearhBox = ({ value$, onChange }) => {
  const value = useReadInputStream(value$)

  return <input value={value} onChange={onChange} />
}

SearhBox.propTypes = {
  value$: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
}

export default SearhBox
