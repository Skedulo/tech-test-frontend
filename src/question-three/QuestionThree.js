import React, { Component } from 'react';

import { SectionGroup } from '../components/section/SectionGroup'
import { SectionPanel } from '../components/section/SectionPanel'

import './QuestionThree.css'

export class QuestionThree extends Component {
  constructor(props) {
    super(props)
    this.state = { }
  }

  render() {
    return (
      <SectionGroup>
        <SectionPanel>
          Please refer to INSTRUCTIONS.md
        </SectionPanel>
      </SectionGroup>
    )
  }
}