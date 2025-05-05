import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import NextButton from '../../components/NextButton';

describe('NextButton', () => {
  it('renders correctly', () => {
    const { getByTestId } = render(<NextButton />);
    expect(getByTestId('next-button')).toBeTruthy();
  });

  it('handles press event', () => {
    const onPress = jest.fn();
    const { getByTestId } = render(<NextButton onPress={onPress} />);
    fireEvent.press(getByTestId('next-button'));
    expect(onPress).toHaveBeenCalled();
  });

  it('shows disabled state', () => {
    const { getByTestId } = render(<NextButton disabled />);
    const button = getByTestId('next-button');
    expect(button.props.disabled).toBe(true);
  });
}); 