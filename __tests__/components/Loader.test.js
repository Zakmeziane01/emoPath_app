import React from 'react';
import { render } from '@testing-library/react-native';
import Loader from '../../components/Loader';

describe('Loader', () => {
  it('renders correctly', () => {
    const { getByTestId } = render(<Loader />);
    expect(getByTestId('loader')).toBeTruthy();
  });

  it('shows loading text', () => {
    const { getByText } = render(<Loader />);
    expect(getByText('Loading...')).toBeTruthy();
  });

  it('applies custom message', () => {
    const { getByText } = render(<Loader message="Please wait" />);
    expect(getByText('Please wait')).toBeTruthy();
  });
}); 