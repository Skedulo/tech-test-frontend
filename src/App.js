import React, { useState, useEffect, useRef } from 'react'
import './App.css'

import { DataService } from './service/DataService'
import { QuestionOne } from './question-one/QuestionOne'
import { QuestionTwo } from './question-two/QuestionTwo'
import { QuestionThree } from './question-three/QuestionThree'

const AppTabs = {
  First: 'first',
  Second: 'second',
  Third: 'three'
}


const AvailableTabs = ({ onSelect, selectedTab }) => {
  return (
    <div className="app__tab-group">
      <div className={ 'app__tab ' + (selectedTab === AppTabs.First ? 'app__tab--selected' : '') } onClick={ () => onSelect(AppTabs.First) }>First Question</div>
      <div className={ 'app__tab ' + (selectedTab === AppTabs.Second ? 'app__tab--selected' : '') } onClick={ () => onSelect(AppTabs.Second) }>Second Question</div>
      <div className={ 'app__tab ' + (selectedTab === AppTabs.Third ? 'app__tab--selected' : '') } onClick={ () => onSelect(AppTabs.Third) }>Third Question</div>
    </div>
  )
}

const Tabs = ({ selectedTab, appHeaderHeight }) => {
  switch (selectedTab) {
    case AppTabs.Third:
      return (
        <QuestionThree service={ DataService } appHeaderHeight={appHeaderHeight}  />
      )
    case AppTabs.Second:
      return (
        <QuestionTwo service={ DataService } />
      )
    case AppTabs.First:
    default:
      return (
        <QuestionOne service={ DataService } />
      )
  }
}

function App() {
  const defaultTab = localStorage.getItem('selectedTab') || AppTabs.First

  const [selectedTab, setSelectedTab] = useState(defaultTab)

  const selectTab = (tab) => {
    setSelectedTab(tab)
    localStorage.setItem('selectedTab', tab)
    
  }

  const [elHeight, setElHeight] = useState('')
  const elRef = useRef()
  useEffect(() => {
    document.onreadystatechange = () => {
      setElHeight(elRef.current.offsetHeight)
    }
  }, [elHeight])

  return (
    <div className="app__container">
      <header className="app__header" ref={el => elRef.current = el}>
        <h1 className="app__title">Skedulo Technical Test</h1>
        <AvailableTabs onSelect={selectTab} selectedTab={selectedTab} />
      </header>
      <div className={ selectedTab !== AppTabs.Third ? 'app__content' : 'app__content-blank' }>
        <Tabs selectedTab={selectedTab} appHeaderHeight={elHeight} />
      </div>
    </div>
  )
}

export default App
