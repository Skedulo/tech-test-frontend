import React from 'react';

import { SectionGroup } from '../components/section/SectionGroup'
import { SectionPanel } from '../components/section/SectionPanel'

import './QuestionOne.css'

export const QuestionOne = (props) => {
  return (
    <SectionGroup>
      <SectionPanel>
        Please refer to INSTRUCTIONS.md
      </SectionPanel>
    </SectionGroup>
  )
}