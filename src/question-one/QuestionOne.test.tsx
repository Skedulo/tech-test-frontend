import React from 'react'

import { render, act, fireEvent  } from '@testing-library/react'

import {QuestionOne} from './QuestionOne'

let setup = () => {
  const mockSearchFn = jest.fn()
  const mockSerivce = {
    getJobsWithSearchTerm: mockSearchFn
  }

  let utils = render(<QuestionOne service={mockSerivce}/>)

  const inputNode = utils.getByLabelText('Job Name:') as HTMLInputElement
  const jobListNode = utils.getByTitle('Job List')
  return {
    utils,
    mockSearchFn,
    inputNode,
    jobListNode
  }
}

describe('QuestionOne', () => {
  it('should display an input with empty value', () => {
    let {inputNode} = setup()

    expect(inputNode.value).toEqual('')
  })

  it('should show loading text after input value update', async () => {
    let {mockSearchFn, inputNode, jobListNode} = setup()

    act(() => {
      fireEvent.change(inputNode, { target: { value: '123' } })
    })

    expect(jobListNode.textContent).toBe('loading')
    mockSearchFn.mockImplementationOnce(() => [[]])

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 600))
    })

    expect(jobListNode.textContent).toBe('Not Found')
  })

  it('should matching job list after service return data', async () => {
    let {mockSearchFn, inputNode, jobListNode, utils} = setup()

    act(() => {
      fireEvent.change(inputNode, { target: { value: '123' } })
    })

    expect(jobListNode.textContent).toBe('loading')

    mockSearchFn.mockImplementationOnce(() => [[{ id: '1' }, { id: '2' }]])

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 600))
    })

    expect(utils.getAllByTitle(/^Job Item:/)).toHaveLength(2)
  })
})
