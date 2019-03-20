import React, { Component } from 'react';

import { SectionGroup } from '../components/section/SectionGroup'
import { SectionPanel } from '../components/section/SectionPanel'

import './QuestionTwo.css';

/**
 * Please do not change these dates, the data on the server all fall within the 01/09/2018
 */
const RANGE_START = new Date('2018-09-01T00:00:00Z')
const RANGE_END = new Date('2018-09-01T24:00:00Z')

export class QuestionTwo extends Component {
  constructor(props) {
    super(props)

    this.state = {
    }
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