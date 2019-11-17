import React from 'react'
import { render, act } from '@testing-library/react'

import { BehaviorSubject } from 'rxjs'

import JobList from './JobList'

const renderJobList = (initialSearchString = '') => {
  const mockSearchFn = jest.fn()
  const mockSerivce = {
    getJobsWithSearchTerm: mockSearchFn
  }

  const input$ = new BehaviorSubject(initialSearchString)

  let jobList = render(<JobList service={mockSerivce} searchString$={input$}/>)

  return {
    jobList,
    input$,
    mockSearchFn
  }
}

describe('JobList', () => {
  it('should render nothing when useLoadJobs return inital', () => {
    const { jobList } = renderJobList()
    expect(jobList.baseElement.textContent).toBe('')

    jobList.unmount()
  })

  it('should render loading state when useLoadJobs return isLoading', async () => {
    const { jobList } = renderJobList('123')

    expect(jobList.baseElement.textContent).toBe('loading')

    jobList.unmount()
  })

  it('should render \'Not Found\' when useLoadJobs return empty jobs', async () => {
    const { jobList, mockSearchFn } = renderJobList('123')
    mockSearchFn.mockImplementationOnce(() => [[]])

    expect(jobList.baseElement.textContent).toBe('loading')

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 600))
    })
    expect(mockSearchFn).toBeCalledWith('123')

    expect(jobList.baseElement.textContent).toBe('Not Found')

    jobList.unmount()
  })

  it('should render matchSnapshot when useLoadJobs return array jobs', async () => {
    const { jobList, mockSearchFn } = renderJobList('123')
    mockSearchFn.mockImplementationOnce(() => [[{ id: '1' }, { id: '2' }]])
    
    expect(jobList.baseElement.textContent).toBe('loading')

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 600))
    })

    expect(mockSearchFn).toBeCalledWith('123')
    
    expect(jobList.getAllByTitle(/^Job Item:/)).toHaveLength(2)

    jobList.unmount()
  })
})
