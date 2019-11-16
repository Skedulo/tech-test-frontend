import React from 'react'
import { create, act } from 'react-test-renderer'

import { BehaviorSubject } from 'rxjs'

import JobList from './JobList'

jest.mock('./JobItem', () => () => '<JobItem/>')

const renderJobList = (initialSearchString = '') => {
  const mockSearchFn = jest.fn()
  const mockSerivce = {
    getJobsWithSearchTerm: mockSearchFn
  }

  const input$ = new BehaviorSubject(initialSearchString)

  const jobList = create(<JobList service={mockSerivce} searchString$={input$}/>)

  return {
    jobList,
    input$,
    mockSearchFn
  }
}

describe('JobList', () => {
  it('should render nothing when useLoadJobs return inital', () => {
    const { jobList } = renderJobList()
    expect(jobList.toJSON()).toBe(null)
  })

  it('should render loading state when useLoadJobs return isLoading', async () => {
    const { jobList, mockSearchFn } = renderJobList('123')
    act(() => {})

    expect(jobList.toJSON()).toBe('loading')

    await act(async () => new Promise(resolve => setTimeout(resolve, 600)))

    expect(mockSearchFn).toBeCalledWith('123')
  })

  it('should render \'Not Found\' when useLoadJobs return empty jobs', async () => {
    const { jobList, mockSearchFn } = renderJobList('123')
    mockSearchFn.mockImplementationOnce(() => [[]])

    act(() => {})
    expect(jobList.toJSON()).toBe('loading')

    await act(async () => new Promise(resolve => setTimeout(resolve, 600)))
    expect(mockSearchFn).toBeCalledWith('123')
    expect(jobList.toJSON()).toBe('Not Found')
  })

  it('should render matchSnapshot when useLoadJobs return array jobs', async () => {
    const { jobList, mockSearchFn } = renderJobList('123')
    mockSearchFn.mockImplementationOnce(() => [[{ id: '1' }, { id: '2' }]])

    act(() => {})
    expect(jobList.toJSON()).toBe('loading')

    await act(async () => new Promise(resolve => setTimeout(resolve, 600)))
    expect(mockSearchFn).toBeCalledWith('123')
    expect(jobList.toJSON()).toMatchSnapshot()
  })
})
