import React from 'react'
import {fireEvent, render, screen, waitFor, waitForElementToBeRemoved} from '@testing-library/react'
import * as data from '../server/db.json'

import { QuestionOne } from './QuestionOne'
import '@testing-library/jest-dom'
import { formatDateTime } from "../common/formatDateTime";

const MOCK_SEARCH_TERMS = {
  NO_RESULTS: 'Nothing',
  TWO_CHARACTERS: 'Bu',
  HAS_RESULTS: 'Build'
}

const mockList = [
  {
    ...data.jobs[0],
    contact: data.contacts[0]
  },
  {
    ...data.jobs[1],
    contact: data.contacts[1]
  }
]

const mockDataService = {
  getJobsWithSearchTerm: (searchTerm) => {
    if (searchTerm === MOCK_SEARCH_TERMS.NO_RESULTS) {
      return Promise.resolve([])
    }
    return Promise.resolve(mockList)
  }
}

const fireOnInputChange = (searchTerm) => {
  const searchJobInput = screen.getByLabelText(/Search Jobs/i)
  fireEvent.change(searchJobInput, { target: { value: searchTerm }})
}

test('it renders correctly when there are results', async () => {
  render(<QuestionOne service={mockDataService} />)
  fireOnInputChange(MOCK_SEARCH_TERMS.HAS_RESULTS)
  const searchResults = await screen.findAllByTestId('search-result-item')
  expect(searchResults).toHaveLength(2)

  // It does not display spinner after it's loaded
  expect(screen.queryByTestId('loading-spinner')).toBeNull()

  // First row
  expect(screen.queryByTestId(`search-result-name-0`)).toHaveTextContent(mockList[0].name)
  expect(screen.queryByTestId(`search-result-start-date-0`)).toHaveTextContent(formatDateTime(mockList[0].start))
  expect(screen.queryByTestId(`search-result-end-date-0`)).toHaveTextContent(formatDateTime(mockList[0].end))
  expect(screen.queryByTestId(`search-result-contact-name-0`)).toHaveTextContent(mockList[0].contact.name)

  // Second row
  expect(screen.queryByTestId(`search-result-name-1`)).toHaveTextContent(mockList[1].name)
  expect(screen.queryByTestId(`search-result-start-date-1`)).toHaveTextContent(formatDateTime(mockList[1].start))
  expect(screen.queryByTestId(`search-result-end-date-1`)).toHaveTextContent(formatDateTime(mockList[1].end))
  expect(screen.queryByTestId(`search-result-contact-name-1`)).toHaveTextContent(mockList[1].contact.name)

  // It clears results correctly
  const clearButton = screen.queryByTestId('clear-button')
  fireEvent.click(clearButton)
  expect(screen.queryByTestId('search-result-item')).toBeNull()
})


test('it renders correctly when there are no results', async () => {
  render(<QuestionOne service={mockDataService} />)
  fireOnInputChange(MOCK_SEARCH_TERMS.NO_RESULTS)
  const noSearchResults = await screen.findByTestId('no-search-results')
  expect(noSearchResults).toHaveTextContent('There were no search results found.')
})

test('it displays spinner when loading', async () => {
  render(<QuestionOne service={mockDataService} />)
  fireOnInputChange(MOCK_SEARCH_TERMS.HAS_RESULTS)
  expect(await screen.findAllByTestId('loading-spinner')).toHaveLength(1)
})

test('it does not call the API when there are less than 3 characters', async () => {
  const mockOnlyService = {
    getJobsWithSearchTerm: jest.fn()
  }
  render(<QuestionOne service={mockOnlyService} />)
  fireOnInputChange(MOCK_SEARCH_TERMS.TWO_CHARACTERS)
  expect(mockOnlyService.getJobsWithSearchTerm).not.toHaveBeenCalled()

  // It does not display the no results message
  expect(screen.queryByTestId('no-search-results')).toBeNull()
})

it('displays an error when the service returns a rejected promise', async () => {
  const mockOnlyService = {
    getJobsWithSearchTerm: () => Promise.reject({ message: 'mock error' })
  }
  render(<QuestionOne service={mockOnlyService} />)
  fireOnInputChange(MOCK_SEARCH_TERMS.HAS_RESULTS)
  const errorNotification = await screen.findByTestId('error-notification')
  expect(errorNotification).toHaveTextContent('mock error')
})

