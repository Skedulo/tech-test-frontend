import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QuestionOne } from './QuestionOne';
import getJobsWithSearchTermData from './__mocks__/getJobsWithSearchTermData';

const delay = (time: number) => new Promise((resolve) => setTimeout(() => resolve(''), time))
describe('renders QuestionOne component', () => {
    const service = {
        getJobs: jest.fn(),
        getJobsWithSearchTerm: jest.fn(async (searchText: string) => {
            const data = getJobsWithSearchTermData.filter((job) => job.name.includes(searchText));
            return data;
        }),
        getActivities: jest.fn(),
        getJobAllocations: jest.fn(),
        getActivityAllocations: jest.fn(),
        getResources: jest.fn(),
        getContacts: jest.fn()
    }
    test('should render QuestionOne when search text is EMPTY', async () => {
        render(<QuestionOne service={service} />);
        const searchBox = screen.getByPlaceholderText('Enter Job here...') as HTMLInputElement;
        //Search text length < 3 characters
        fireEvent.change(searchBox, { target: { value: '' } });
        await waitFor(() => delay(500));
        const jobCount = await screen.findByTestId('job-count');
        console.log(jobCount.textContent);
        const jobList = await screen.findByTestId('job-list');
        //Search value should be Bu
        expect(searchBox.value).toBe('')
        //Job Count should be 0
        expect(jobCount).toHaveTextContent('0 job(s) found');
        //Job list should be empty
        expect(jobList.innerHTML).toBe('');
    });

    test('should render QuestionOne when search text is less than 3 characters', async () => {
        render(<QuestionOne service={service} />);
        const searchBox = screen.getByPlaceholderText('Enter Job here...') as HTMLInputElement;
        //Search text length < 3 characters
        fireEvent.change(searchBox, { target: { value: 'Bu' } });
        await waitFor(() => delay(500));
        const jobCount = await screen.findByTestId('job-count');
        console.log(jobCount.textContent);
        const jobList = await screen.findByTestId('job-list');
        //Search value should be Bu
        expect(searchBox.value).toBe('Bu')
        //Job Count should be 0
        expect(jobCount).toHaveTextContent('0 job(s) found');
        //Job list should be empty
        expect(jobList.innerHTML).toBe('');
    });

    test('should render QuestionOne when search text is equal to 3 characters', async () => {
        render(<QuestionOne service={service} />);
        const searchBox = screen.getByPlaceholderText('Enter Job here...') as HTMLInputElement;
        //Search text length < 3 characters
        fireEvent.change(searchBox, { target: { value: 'Bui' } });
        await waitFor(() => delay(500));
        const jobCount = await screen.findByTestId('job-count');
        console.log(jobCount.textContent);
        const jobList = await screen.findByTestId('job-list');
        //Search value should be Bu
        expect(searchBox.value).toBe('Bui')
        //Job Count should be 0
        expect(jobCount).toHaveTextContent('2 job(s) found');
        //Job list should be empty
        expect(jobList.children.length).toBe(2);
    });

    test('should render QuestionOne when search text is greater than 3 characters', async () => {
        render(<QuestionOne service={service} />);
        const searchBox = screen.getByPlaceholderText('Enter Job here...') as HTMLInputElement;
        //Search text length < 3 characters
        fireEvent.change(searchBox, { target: { value: 'Build' } });
        await waitFor(() => delay(500));
        const jobCount = await screen.findByTestId('job-count');
        console.log(jobCount.textContent);
        const jobList = await screen.findByTestId('job-list');
        //Search value should be Bu
        expect(searchBox.value).toBe('Build')
        //Job Count should be 0
        expect(jobCount).toHaveTextContent('2 job(s) found');
        //Job list should be empty
        expect(jobList.children.length).toBe(2);
    });

    test('should not trigger onSearchTextChange when timeout is less than 500ms', async () => {
        render(<QuestionOne service={service} />);
        const searchBox = screen.getByPlaceholderText('Enter Job here...') as HTMLInputElement;
        //Search text length < 3 characters
        fireEvent.change(searchBox, { target: { value: 'Build' } });
        await waitFor(() => delay(400));
        const jobCount = await screen.findByTestId('job-count');
        console.log(jobCount.textContent);
        const jobList = await screen.findByTestId('job-list');
        //Search value should be Bu
        expect(searchBox.value).toBe('Build')
        //Job Count should be 0
        expect(jobCount).toHaveTextContent('0 job(s) found');
        //Job list should be empty
        expect(jobList.innerHTML).toBe('');
    });

    test('should not when timeout is less than 500ms', async () => {
        render(<QuestionOne service={service} />);
        const searchBox = screen.getByPlaceholderText('Enter Job here...') as HTMLInputElement;
        //Search text length < 3 characters
        fireEvent.change(searchBox, { target: { value: 'Build' } });
        await waitFor(() => delay(400));
        const jobCount = await screen.findByTestId('job-count');
        console.log(jobCount.textContent);
        const jobList = await screen.findByTestId('job-list');
        //Search value should be Bu
        expect(searchBox.value).toBe('Build')
        //Job Count should be 0
        expect(jobCount).toHaveTextContent('0 job(s) found');
        //Job list should be empty
        expect(jobList.innerHTML).toBe('');
    });

})

