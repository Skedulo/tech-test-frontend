import React from 'react'
import { IAppTabContainer } from '../common/types'

import { SectionGroup } from '../components/section/SectionGroup'
import { SectionPanel } from '../components/section/SectionPanel'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface ResourceSchedule {
  resourceName: string
  resourceId: number
  allocations: {
    allocType: 'job' | 'activity'
    name: string
    start: string
    end: string
  }[]
}

export const QuestionTwo = (props: IAppTabContainer) => {
  return (
    <SectionGroup>
      <SectionPanel>Please refer to INSTRUCTIONS.md</SectionPanel>
    </SectionGroup>
  )
}
