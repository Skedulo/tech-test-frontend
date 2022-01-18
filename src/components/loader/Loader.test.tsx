import React from 'react';
import { render, screen } from '@testing-library/react';
import { Loader } from './Loader';

describe('renders Loader component', () => {
    test('should render Loader when visible is default', () => {
        render(<Loader />);
        const loader = screen.getByTitle('Loading');
        expect(loader).toBeInTheDocument();
    });

    test('should render Loader when visible = true', () => {
        render(<Loader visible={true} />);
        const loader = screen.getByTitle('Loading');
        expect(loader).toBeInTheDocument();
    });

    test('should render Loader when visible = false', () => {
        render(<Loader visible={false} />);
        const loader = screen.queryByTitle('Loading');
        expect(loader).not.toBeInTheDocument();
    });
})

