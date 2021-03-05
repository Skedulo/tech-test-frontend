import React from 'react'
import { render, screen } from '@testing-library/react'
import * as data from '../server/db.json'

import { QuestionTwo } from './QuestionTwo'

const mockDataService = {
  getJobs: () => Promise.resolve(data.jobs),
  getJobAllocations: () => Promise.resolve(data.jobAllocations),
  getActivities: () => Promise.resolve(data.activities),
  getActivityAllocations: () => Promise.resolve(data.activityAllocations),
  getResources: () => Promise.resolve(data.resources)
}

test('fetched and merged data is in the expected shape', async () => {
  render(<QuestionTwo service={mockDataService} />)

  expect(await screen.findByText('[{"resourceName":"Sam Seaborn","resourceId":0,"allocations":[{"allocType":"job","name":"Shield some wiring","start":"2018-09-01T09:00:00Z","end":"2018-09-01T13:00:00Z"}]},{"resourceName":"Donna Moss","resourceId":1,"allocations":[{"allocType":"activity","name":"Meal Break","start":"2018-09-01T12:15:00Z","end":"2018-09-01T13:10:00Z"},{"allocType":"job","name":"Build a shed","start":"2018-09-01T10:15:00Z","end":"2018-09-01T11:00:00Z"}]},{"resourceName":"Toby Ziegler","resourceId":2,"allocations":[{"allocType":"activity","name":"Meal Break","start":"2018-09-01T12:15:00Z","end":"2018-09-01T13:10:00Z"}]}]'))
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