import React from 'react'
import {create} from 'react-test-renderer'

import JobItem from './JobItem'

describe('JobItem', () => {
    it('should render correctly', () => {
        const item = {
            name: 'job',
            start: 'start',
            end: 'end',
            contact: {
                name : 'contactName'
            },
        }
        const jobItem = create(<JobItem item={item}/>)
        
        expect(jobItem.toJSON()).toMatchSnapshot()
    })
})