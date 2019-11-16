import React from 'react'
import {create} from 'react-test-renderer'

import JobItem from './JobItem'
import { Job } from '../../types/Job'

describe('JobItem', () => {
    it('should render correctly', () => {
        const item = {
            name: 'job',
            start: 'start',
            end: 'end',
            contact: {
                name : 'contactName'
            },
        } as Job
        const jobItem = create(<JobItem item={item}/>)
        
        expect(jobItem.toJSON()).toMatchSnapshot()
    })
})