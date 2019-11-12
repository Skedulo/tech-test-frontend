import React from 'react';

import Header from './components/Header'
import Sidebar from './components/Sidebar'

import './QuestionThree.css'
import JobList from './components/JobList';
import RightHandSide from './components/RightHandSide';

export const QuestionThree = ({service}) => {
  return (
    <div className="q3__container">
      <Header className="q3__header"/>
      <Sidebar className="q3__sidebar" />
      <JobList className="q3__jobs" service={service}/>
      <RightHandSide className="q3__fake" />
    </div>
  )
}
