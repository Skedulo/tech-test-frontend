import React from "react"

import "./Swimlane.css"

interface ICard {
  laneStart: number
  laneEnd: number
  start: number
  end: number
  description: string
  style: React.StyleHTMLAttributes<HTMLDivElement>
  className?: string
}

interface ILane {
  title: string
  start: number
  end: number
  cards: ICard[]
}

interface ISwimlaneProps {
  lanes: ILane[]
  start: number
  end: number
}

export const Swimlane: React.FC<ISwimlaneProps> = (props) => (
  <div className={"swimlane"}>
    {props.lanes.map((lane) => (
      <Lane
        title={lane.title}
        start={props.start}
        end={props.end}
        cards={lane.cards}
      />
    ))}
  </div>
)

export const Lane: React.FC<ILane> = (props) => (
  <div className={"swimlane__lane"}>
    <LaneTitle title={props.title} />
    <LaneDetail start={props.start} end={props.end} cards={props.cards} />
  </div>
)

export const LaneTitle = (props: Pick<ILane, "title">) => (
  <div className={"swimlane__title"}>{props.title}</div>
)

export const LaneDetail: React.FC<{
  cards: ICard[]
  start: number
  end: number
}> = (props) => (
  <div className={"swimlane__detail"}>
    {props.cards.map((card) => (
      <Card
        laneStart={props.start}
        laneEnd={props.end}
        className={card.className}
        style={card.style}
        description={card.description}
        start={card.start}
        end={card.end}
      />
    ))}
  </div>
)

export const Card: React.FC<ICard> = (props) => {
  const fullWidth = props.laneEnd - props.laneStart
  const duration = props.end - props.start
  const startOffset = props.start - props.laneStart

  if (fullWidth < 0 || duration < 0 || startOffset < 0) {
    return null
  }

  const widthPercent = duration / (fullWidth / 100)
  const leftPercent = startOffset / (fullWidth / 100)
  const style = {
    ...(props.style || {}),
    left: leftPercent + "%",
    width: widthPercent + "%",
  }
  /**
   * Uncomment to see the results of the calculation if needed
   console.log(
     "render card",
     style,
     fullWidth / 1000 / 60,
     duration / 1000 / 60,
     startOffset / 1000 / 60,
     props.start,
     props.laneStart
     )
  */
  return (
    <div className={"swimlane__card " + (props.className || "")} style={style}>
      {props.description}
    </div>
  )
}
