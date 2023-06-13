import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { FormSections } from '../form-section';

describe('FormSections', () => {
    test('allows user input and form submission', () => {
        // Mock onSubmit function
        const mockOnSubmit = jest.fn();

        // Render the component
        render(<FormSections onSubmit={mockOnSubmit} isLoading={false} />);

        // Get the input element
        const inputElement = screen.getByTestId('username') as HTMLInputElement;

        // Simulate user input
        fireEvent.change(inputElement, { target: { value: 'testuser' } });

        // Verify that the input value has changed
        expect(inputElement.value).toBe('testuser');

        // Simulate form submission
        fireEvent.submit(screen.getByTestId('form-search'));

        // Verify that the onSubmit function is called with the correct event
        expect(mockOnSubmit).toHaveBeenCalledTimes(1);
        expect(mockOnSubmit.mock.calls[0][0]).toBeDefined();
        expect(mockOnSubmit.mock.calls[0][0].target.elements.username.value).toBe('testuser');
    });
});
