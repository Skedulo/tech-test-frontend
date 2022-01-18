import React from 'react';
import { render, screen } from '@testing-library/react';
import { JobGrid } from './JobGrid';

describe('renders job grid component', () => {
    const jobs = [{
        name: "Build a fence",
        contact: {
            id: 0,
            name: 'John Smith'
        },
        start: "2018-09-01T10:00:00",
        end: "2018-09-01T11:00:00"

    }, {
        name: "Build a shed",
        contact: {
            id: 0,
            name: 'Hao Nguyen'
        },
        start: "2018-09-01T17:00:00",
        end: "2018-09-01T18:00:00"

    }]

    test('should render all jobs in job grid', () => {
        render(<JobGrid data={jobs} />);
        const jobCountElement = screen.getByText('2 job(s) found');
        expect(jobCountElement).toBeInTheDocument();
        const jobListElement = screen.getAllByTestId('job-name');
        expect(jobListElement.length).toBe(2);
    });

    test('should render empty list in job grid', () => {
        render(<JobGrid data={[]} />);
        const jobCountElement = screen.getByText('0 job(s) found');
        expect(jobCountElement).toBeInTheDocument();
        const jobListElement = screen.queryAllByTestId('job-name');
        expect(jobListElement.length).toBe(0);
    });

})

