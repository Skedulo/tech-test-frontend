import React from 'react';

import { SectionGroup } from '../components/section/SectionGroup'
import { SectionPanel } from '../components/section/SectionPanel'
import SideBar from '../components/sidebar'
import Header from '../components/header'
import JobList from '../components/joblist'
import BoxList from '../components/boxlist'
import Content from '../components/content'
import colors from '../style/second-colors'


import './QuestionThree.css'

export const QuestionThree = (props) => {
  return (
    <SectionGroup>
      <SectionPanel>
        <SideBar color={colors.light} />
        <Header color={colors.light}> 
          <span>Header</span>
        </Header>
        <Content color={colors.light} left={JobList} right={BoxList}/>
        {/* <JobList color={colors.light} /> 
        <BoxList color={colors.light} />  */}
      </SectionPanel>
    </SectionGroup>
  )
}