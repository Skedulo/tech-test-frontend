import React from 'react';
import { render, screen } from '@testing-library/react';

import { JobItem } from './JobItem';

describe('renders job item component', () => {
    const job = {
        name: "Build a fence",
        contact: {
            id: 0,
            name: 'John Smith'
        },
        start: "2018-09-01T10:00:00",
        end: "2018-09-01T11:00:00"

    }

    test('should render all information of job item', () => {
        render(<JobItem item={job} />);
        const jobNameElement = screen.getByTestId('job-name');
        expect(jobNameElement.textContent).toBe('Build a fence');

        const dateTimeFromElement = screen.getByTestId('datetime-from');
        expect(dateTimeFromElement).toHaveTextContent('From');
        expect(dateTimeFromElement).toHaveTextContent('Sat Sep 01 2018 10:00 AM');

        const dateTimeToElement = screen.getByTestId('datetime-to');
        expect(dateTimeToElement).toHaveTextContent('To');
        expect(dateTimeToElement).toHaveTextContent('Sat Sep 01 2018 11:00 AM');

        const contactElement = screen.getByTestId('contact');
        expect(contactElement).toContainHTML(`<div data-testid="contact"><span class="bold-600">Contact: </span>John Smith</div>`)
    });

    test('should render all information of job item with some fields empty', () => {
        const extendedJob = {
            ...job,
            name: '',
            contact: {
                id: 0,
                name: ''
            }
        }
        render(<JobItem item={extendedJob} />);
        const jobNameElement = screen.getByTestId('job-name');
        expect(jobNameElement.textContent).toBe('');

        const contactElement = screen.getByTestId('contact');
        expect(contactElement).toContainHTML(`<div data-testid="contact"><span class="bold-600">Contact: </span></div>`)
    });
})

