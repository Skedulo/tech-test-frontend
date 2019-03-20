import React, { Component } from 'react'

import { DataService } from './service/DataService'
import { QuestionOne } from './question-one/QuestionOne'
import { QuestionTwo } from './question-two/QuestionTwo'

import './App.css'

const AppTabs = {
  First: 'first',
  Second: 'second'
}

class App extends Component {
  constructor (props) {
    super(props)

    const defaultTab = localStorage.getItem('selectedTab') || AppTabs.First
    this.state = {
      selectedTab: defaultTab
    }
  }

  setSelectedTab = (selectedTab) => {
    this.setState({
      selectedTab
    }, () => localStorage.setItem('selectedTab', this.state.selectedTab))
  }
  
  renderTabs = () => {
    return (
      <div className="app__tab-group">
        <div className={ 'app__tab ' + (this.state.selectedTab === AppTabs.First ? 'app__tab--selected' : '') } onClick={ () => this.setSelectedTab(AppTabs.First) }>First Question</div>
        <div className={ 'app__tab ' + (this.state.selectedTab === AppTabs.Second ? 'app__tab--selected' : '') } onClick={ () => this.setSelectedTab(AppTabs.Second) }>Second Question</div>
      </div>
    )
  }

  renderContent = () => {
    switch (this.state.selectedTab) {
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

  render() {
    return (
      <div className="app__container">
        <header className="app__header">
          <h1 className="app__title">Skedulo Technical Test</h1>
          { this.renderTabs() }
        </header>
        <div className="app__content">
          { this.renderContent() }
        </div>
      </div>
    )
  }
}

export default App;
