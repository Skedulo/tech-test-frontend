import React from 'react';

import { SectionGroup } from '../components/section/SectionGroup'
import { SectionPanel } from '../components/section/SectionPanel'

import './QuestionOne.css'
import useCreateInputStream from './hooks/useCreateInputStream';

import SearchBox from './components/SearchBox';
import JobList from './components/JobList';

const QuestionOne = ({service}) => {
  let [searchString$, onChange] = useCreateInputStream();
  return (
    <SectionGroup>
      <SectionPanel>
        <div>
          <SearchBox value$={searchString$} onChange={onChange}/>
        </div>
        <div>
          <JobList searchString$={searchString$} service={service} />
        </div>
      </SectionPanel>
    </SectionGroup>
  )
}

export {QuestionOne}