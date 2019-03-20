import React from 'react';

import './Swimlane.css'

export const Swimlane = props => (
  <div className={ 'swimlane__container' }>
    { props.lanes.map(lane => (<Lane title={ lane.title } start={ props.start } end={ props.end } cards={ lane.cards } />)) }
  </div>
)

export const Lane = props => (
  <div className={ 'swimlane__lane' }>
    <LaneTitle title={ props.title } />
    <LaneDetail start={ props.start } end={ props.end } cards={ props.cards } />
  </div>
)

export const LaneTitle = props => (
  <div className={ 'swimlane__title' }>
    { props.title }
  </div>
)

export const LaneDetail = props => (
  <div className={ 'swimlane__detail' }>
    { props.cards.map(card => (<Card laneStart={ props.start } laneEnd={ props.end } className={ card.className } style={ card.style } description={ card.description } start={ card.start } end={ card.end } />)) }
  </div>
)

export const Card = props => {
  const fullWidth = props.laneEnd - props.laneStart
  const duration = props.end - props.start
  const startOffset = props.start - props.laneStart

  if(fullWidth < 0 || duration < 0 || startOffset < 0) {
    return null;
  }

  const widthPercent =  duration / (fullWidth / 100)
  const leftPercent = startOffset / (fullWidth / 100)
  const style = { ...(props.style || {}), left: leftPercent + '%', width: widthPercent + '%' }
  console.log('render card', style, fullWidth / 1000 / 60, duration / 1000 / 60, startOffset / 1000 / 60, props.start, props.laneStart)
  return (
    <div className={ 'swimlane__card ' + (props.className || '') } style={ style }>
      { props.description }
    </div>
  )
}