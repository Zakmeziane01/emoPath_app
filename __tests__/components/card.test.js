import React from 'react';
import { render } from '@testing-library/react-native';
import Card from '../../components/card';

describe('Card', () => {
  it('renders correctly with title', () => {
    const { getByText } = render(<Card title="Test Card" />);
    expect(getByText('Test Card')).toBeTruthy();
  });

  it('renders children content', () => {
    const { getByText } = render(
      <Card>
        <Text>Card Content</Text>
      </Card>
    );
    expect(getByText('Card Content')).toBeTruthy();
  });

  it('applies custom styles', () => {
    const customStyle = { backgroundColor: 'blue' };
    const { getByTestId } = render(
      <Card style={customStyle} />
    );
    const card = getByTestId('card');
    expect(card.props.style).toContainEqual(customStyle);
  });
}); 