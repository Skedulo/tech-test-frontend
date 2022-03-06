import React from 'react'
import { render, screen } from '@testing-library/react'
import * as data from '../server/db.json'

import { QuestionTwo } from './QuestionTwo'

const mockActivityAllocations = [
  {
    "resource": data.resources[1],
    "activity": {
      "name": "Meal Break",
      "start": "2018-09-01T12:15:00Z",
      "end": "2018-09-01T13:10:00Z"
    }
  },
  {
    "resource": data.resources[2],
    "activity": {
      "name": "Meal Break",
      "start": "2018-09-01T12:15:00Z",
      "end": "2018-09-01T13:10:00Z"
    }
  }
]

const mockJobAllocations =  [
  {
    "resource": data.resources[1],
    "job": {
      "name": "Build a shed",
      "start": "2018-09-01T10:15:00Z",
      "end": "2018-09-01T11:00:00Z"
    }
  },
  {
    "resource": data.resources[0],
    "job": {
      "name": "Shield some wiring",
      "start": "2018-09-01T09:00:00Z",
      "end": "2018-09-01T13:00:00Z"
    }
  }
]



test('when all data exists, fetched and merged data is in the expected shape', async () => {
  const mockDataService = {
    getJobAndActivityAllocations: () => Promise.resolve({
      activityAllocations: mockActivityAllocations,
      jobAllocations: mockJobAllocations,
      resources: data.resources,
    }),
  }
  render(<QuestionTwo service={mockDataService} />)

  expect(await screen.findByText('[{"resourceName":"Sam Seaborn","resourceId":0,"allocations":[{"allocType":"job","name":"Shield some wiring","start":"2018-09-01T09:00:00Z","end":"2018-09-01T13:00:00Z"}]},{"resourceName":"Donna Moss","resourceId":1,"allocations":[{"allocType":"activity","name":"Meal Break","start":"2018-09-01T12:15:00Z","end":"2018-09-01T13:10:00Z"},{"allocType":"job","name":"Build a shed","start":"2018-09-01T10:15:00Z","end":"2018-09-01T11:00:00Z"}]},{"resourceName":"Toby Ziegler","resourceId":2,"allocations":[{"allocType":"activity","name":"Meal Break","start":"2018-09-01T12:15:00Z","end":"2018-09-01T13:10:00Z"}]}]'))
})

test('when there are no activity allocations, fetched and merged data is in expected shape', async () => {
  const mockDataService = {
    getJobAndActivityAllocations: () => Promise.resolve({
      activityAllocations: [],
      jobAllocations: mockJobAllocations,
      resources: data.resources,
    }),
  }
  render(<QuestionTwo service={mockDataService} />)

  const codeBlock = await screen.findByTestId('code-block')
  const expectedTextContent = '[{"resourceName":"Sam Seaborn","resourceId":0,"allocations":[{"allocType":"job","name":"Shield some wiring","start":"2018-09-01T09:00:00Z","end":"2018-09-01T13:00:00Z"}]},{"resourceName":"Donna Moss","resourceId":1,"allocations":[{"allocType":"job","name":"Build a shed","start":"2018-09-01T10:15:00Z","end":"2018-09-01T11:00:00Z"}]},{"resourceName":"Toby Ziegler","resourceId":2,"allocations":[]}]'

  expect(expect(codeBlock).toHaveTextContent(expectedTextContent))
})

test('when there are no job allocations, fetched and merged data is in expected shape', async () => {
  const mockDataService = {
    getJobAndActivityAllocations: () => Promise.resolve({
      activityAllocations: mockActivityAllocations,
      jobAllocations: [],
      resources: data.resources,
    }),
  }
  render(<QuestionTwo service={mockDataService} />)

  const codeBlock = await screen.findByTestId('code-block')
  const expectedTextContent = '[{"resourceName":"Sam Seaborn","resourceId":0,"allocations":[]},{"resourceName":"Donna Moss","resourceId":1,"allocations":[{"allocType":"activity","name":"Meal Break","start":"2018-09-01T12:15:00Z","end":"2018-09-01T13:10:00Z"}]},{"resourceName":"Toby Ziegler","resourceId":2,"allocations":[{"allocType":"activity","name":"Meal Break","start":"2018-09-01T12:15:00Z","end":"2018-09-01T13:10:00Z"}]}]'
  expect(expect(codeBlock).toHaveTextContent(expectedTextContent))
})

/**
 * Expected output:

[
   {
      "resourceName":"Sam Seaborn",
      "resourceId":0,
      "allocations":[
         {
            "allocType":"job",
            "name":"Shield some wiring",
            "start":"2018-09-01T09:00:00Z",
            "end":"2018-09-01T13:00:00Z"
         }
      ]
   },
   {
      "resourceName":"Donna Moss",
      "resourceId":1,
      "allocations":[
         {
            "allocType":"activity",
            "name":"Meal Break",
            "start":"2018-09-01T12:15:00Z",
            "end":"2018-09-01T13:10:00Z"
         },
         {
            "allocType":"job",
            "name":"Build a shed",
            "start":"2018-09-01T10:15:00Z",
            "end":"2018-09-01T11:00:00Z"
         }
      ]
   },
   {
      "resourceName":"Toby Ziegler",
      "resourceId":2,
      "allocations":[
         {
            "allocType":"activity",
            "name":"Meal Break",
            "start":"2018-09-01T12:15:00Z",
            "end":"2018-09-01T13:10:00Z"
         }
      ]
   }
]

 */