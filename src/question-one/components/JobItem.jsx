import React from 'react'

export default ({item}) => (
  <div>
    <div>Jobs: {item.name}</div>
    <div>Start: {item.start}</div>
    <div>End: {item.end}</div>
    <div>Contact: {item.contact && item.contact.name}</div>
  </div>
)