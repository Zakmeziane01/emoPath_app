import React from 'react';
import { render } from '@testing-library/react-native';
import DisplayHolder from '../../components/DisplayHolder';

describe('DisplayHolder', () => {
  it('renders correctly with title', () => {
    const { getByText } = render(<DisplayHolder title="Test Display" />);
    expect(getByText('Test Display')).toBeTruthy();
  });

  it('renders children content', () => {
    const { getByText } = render(
      <DisplayHolder>
        <Text>Display Content</Text>
      </DisplayHolder>
    );
    expect(getByText('Display Content')).toBeTruthy();
  });

  it('shows loading state', () => {
    const { getByTestId } = render(<DisplayHolder isLoading />);
    expect(getByTestId('loading-indicator')).toBeTruthy();
  });

  it('shows error state', () => {
    const { getByText } = render(
      <DisplayHolder error="Test Error" />
    );
    expect(getByText('Test Error')).toBeTruthy();
  });

  it('applies custom styles', () => {
    const customStyle = { backgroundColor: 'white' };
    const { getByTestId } = render(
      <DisplayHolder style={customStyle} />
    );
    const container = getByTestId('display-holder');
    expect(container.props.style).toContainEqual(customStyle);
  });
}); 