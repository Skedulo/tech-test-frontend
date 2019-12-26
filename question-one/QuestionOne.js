import React, { Component } from 'react'
import { SectionGroup } from '../components/section/SectionGroup'
import { SectionPanel } from '../components/section/SectionPanel'
import { List } from '../components/list/List'
import { SearchBox } from '../components/search/SearchBox'
import { SearchContextProvider } from '../components/search/SearchContext'
import { LoadingIndicator } from '../common/LoadingIndicator'

import './QuestionOne.css'

export class QuestionOne extends Component {
  render() {
    return (
      <SectionGroup>
        <SectionPanel>
          <SearchContextProvider service={this.props.service}>
            <SearchBox />
            <List />
            <LoadingIndicator />
          </SearchContextProvider>
        </SectionPanel>
      </SectionGroup>
    )
  }
}