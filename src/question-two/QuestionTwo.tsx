import React from "react"
import { IAppTabContainer } from "../common/types"

import { SectionGroup } from "../components/section/SectionGroup"
import { SectionPanel } from "../components/section/SectionPanel"

interface Lane {
  title: string
  cards: {
    allocId: number,
    allocType: 'job' | 'activity',
    resourceId: number,
    description: string,
    start: string,
    end: string
  }[]
}

export const QuestionTwo: React.FC<IAppTabContainer> = (props) => {
  return (
    <SectionGroup>
      <SectionPanel>Please refer to INSTRUCTIONS.md</SectionPanel>
    </SectionGroup>
  )
}
