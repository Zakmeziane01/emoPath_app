import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CustomButton from '../../components/CustomButton';

describe('CustomButton', () => {
  it('renders correctly with title', () => {
    const { getByText } = render(<CustomButton title="Test Button" />);
    expect(getByText('Test Button')).toBeTruthy();
  });

  it('handles press event', () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <CustomButton title="Test Button" onPress={onPress} />
    );
    fireEvent.press(getByText('Test Button'));
    expect(onPress).toHaveBeenCalled();
  });

  it('applies custom styles', () => {
    const customStyle = { backgroundColor: 'red' };
    const { getByTestId } = render(
      <CustomButton title="Test Button" containerStyles={customStyle} />
    );
    const button = getByTestId('custom-button');
    expect(button.props.style).toContainEqual(customStyle);
  });

  it('shows loading state', () => {
    const { getByTestId } = render(
      <CustomButton title="Test Button" isLoading />
    );
    expect(getByTestId('loading-indicator')).toBeTruthy();
  });
}); 