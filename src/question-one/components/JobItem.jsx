import React from 'react'
import PropTypes from 'prop-types'

const JobItem = ({ item }) => (
  <div>
    <div>Jobs: {item.name}</div>
    <div>Start: {item.start}</div>
    <div>End: {item.end}</div>
    <div>Contact: {item.contact && item.contact.name}</div>
  </div>
)

JobItem.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string,
    start: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.instanceOf(Date)
    ]),
    end: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.instanceOf(Date)
    ]),
    contact: PropTypes.shape({
      name: PropTypes.string
    })
  })
}

export default JobItem
