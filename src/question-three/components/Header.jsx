import React from 'react'
import PropTypes from 'prop-types'

import './Header.css'

const Header = ({ className }) =>
  <div className={`header ${className}`}>Header</div>

Header.propTypes = {
  className: PropTypes.string
}

export default Header
