import React from 'react'
import PropTypes from 'prop-types'

import './Sidebar.css'

const Sidebar = ({ className }) =>
  <div className={`sidebar ${className}`}>
    <div className="sidebar__item"/>
    <div className="sidebar__item"/>
    <div className="sidebar__item"/>
    <div className="sidebar__item"/>
    <div className="sidebar__item"/>
    <div className="sidebar__item"/>
  </div>

Sidebar.propTypes = {
  className: PropTypes.string
}

export default Sidebar
