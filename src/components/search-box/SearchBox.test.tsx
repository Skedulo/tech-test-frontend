import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { SearchBox } from './SearchBox';

describe('renders SearchBox component', () => {
    test('should render default SearchBox when no props data', () => {
        render(<SearchBox />);
        const searchBox = screen.getByPlaceholderText('Search text here...') as HTMLInputElement;
        expect(searchBox).toBeInTheDocument();
        expect(searchBox.value).toBe('');
    });

    test('should render default SearchBox when placeholder = Enter search text', () => {
        render(<SearchBox placeholder='Enter search text' />);
        const searchBox = screen.getByPlaceholderText('Enter search text') as HTMLInputElement;
        expect(searchBox).toBeInTheDocument();
        expect(searchBox.value).toBe('');
    });

    test('should able to change search text when target value = Build a fence', () => {
        render(<SearchBox />);
        const searchBox = screen.getByPlaceholderText('Search text here...') as HTMLInputElement;
        fireEvent.change(searchBox, { target: {value: "Build a fence"}});
        expect(searchBox.value).toBe('Build a fence');
    });

    test('should trigger the onChange callback when changing search text', () => {
        const onChangeMock = jest.fn();
        render(<SearchBox onChange={onChangeMock} />);
        const searchBox = screen.getByPlaceholderText('Search text here...') as HTMLInputElement;
        fireEvent.change(searchBox, { target: {value: "Build a fence"}});
        expect(onChangeMock).toHaveBeenCalledWith('Build a fence');
    });
})

