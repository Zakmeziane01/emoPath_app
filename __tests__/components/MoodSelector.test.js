import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import MoodSelector from '../../components/MoodSelector';

describe('MoodSelector Component', () => {
  const mockProps = {
    onSelect: jest.fn(),
    selectedMood: null,
  };

  const moods = ['Happy', 'Sad', 'Angry', 'Frustrated', 'Confused', 'Scared', 'Surprised', 'Worried'];

  it('renders all mood options', () => {
    const { getByText } = render(
      <MoodSelector {...mockProps} />
    );

    moods.forEach(mood => {
      expect(getByText(mood)).toBeTruthy();
    });
  });

  it('calls onSelect with correct mood when pressed', () => {
    const { getByText } = render(
      <MoodSelector {...mockProps} />
    );

    const happyButton = getByText('Happy');
    fireEvent.press(happyButton);

    expect(mockProps.onSelect).toHaveBeenCalledWith('happy');
  });

  it('applies selected style to the selected mood', () => {
    const { getByText } = render(
      <MoodSelector {...mockProps} selectedMood="happy" />
    );

    const happyButton = getByText('Happy');
    expect(happyButton.props.className).toContain('bg-primary-300');
  });
}); 