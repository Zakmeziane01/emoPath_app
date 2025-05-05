import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import FormField from '../../components/FormField';

describe('FormField Component', () => {
  const mockProps = {
    title: 'Test Field',
    value: '',
    placeholder: 'Enter text',
    handleChangeText: jest.fn(),
    otherStyles: '',
    keyboardType: 'default',
  };

  it('renders correctly with all props', () => {
    const { getByText, getByPlaceholderText } = render(
      <FormField {...mockProps} />
    );

    expect(getByText('Test Field')).toBeTruthy();
    expect(getByPlaceholderText('Enter text')).toBeTruthy();
  });

  it('calls handleChangeText when text is entered', () => {
    const { getByPlaceholderText } = render(
      <FormField {...mockProps} />
    );

    const input = getByPlaceholderText('Enter text');
    fireEvent.changeText(input, 'Test input');

    expect(mockProps.handleChangeText).toHaveBeenCalledWith('Test input');
  });

  it('applies custom styles when provided', () => {
    const customStyles = 'bg-gray-100';
    const { getByTestId } = render(
      <FormField {...mockProps} otherStyles={customStyles} />
    );

    const container = getByTestId('form-field-container');
    expect(container.props.className).toContain(customStyles);
  });
}); 