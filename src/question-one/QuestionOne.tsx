import React from "react"
import { IAppTabContainer } from "../common/types"

import { SectionGroup } from "../components/section/SectionGroup"
import { SectionPanel } from "../components/section/SectionPanel"

import "./QuestionOne.css"

export const QuestionOne: React.FC<IAppTabContainer> = () => {
  return (
    <SectionGroup>
      <SectionPanel>Please refer to INSTRUCTIONS.md</SectionPanel>
    </SectionGroup>
  )
}
