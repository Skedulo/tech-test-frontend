import React from 'react'
import { render, wait, screen } from '@testing-library/react'
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

  await wait()

  expect(screen.getByText('[{"title":"Sam Seaborn","cards":[{"allocId":1,"allocType":"job","resourceId":0,"description":"Shield some wiring","start":"2018-09-01T09:00:00Z","end":"2018-09-01T13:00:00Z"}]},{"title":"Donna Moss","cards":[{"allocId":0,"allocType":"job","resourceId":1,"description":"Build a shed","start":"2018-09-01T10:15:00Z","end":"2018-09-01T11:00:00Z"},{"allocId":0,"allocType":"activity","resourceId":1,"description":"Meal Break","start":"2018-09-01T12:15:00Z","end":"2018-09-01T13:10:00Z"}]},{"title":"Toby Ziegler","cards":[{"allocId":1,"allocType":"activity","resourceId":2,"description":"Meal Break","start":"2018-09-01T12:15:00Z","end":"2018-09-01T13:10:00Z"}]}]'))
})
